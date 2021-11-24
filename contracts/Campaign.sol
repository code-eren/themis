// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

interface KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata checkData) external returns (bool upkeepNeeded, bytes memory performData);
    function performUpkeep(bytes calldata performData) external;
}

contract Campaign is ChainlinkClient, KeeperCompatibleInterface {
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY;

    // home is just team0, away is team1
    uint256 public homescore;
    uint256 public awayscore;

    address private owner;
    uint256 public gameId;
    uint256 public teamId0; // TODO: probably don't need it, need to ensure consistency
    uint256 public teamId1; // TODO: probably don't need it, need to ensure consistency
    uint256 public odds0; // odd that team0 wins 1.1 -> 110 , bid 1, get 1.1 back
    uint256 public odds1; // odd that team1 wins 4.1 -> 410 , bid 1, get 4.1 back
    uint256 public oddsDraw; // odd of draw wins 3   -> 300 , bid 1, get 3 back
    uint256 public expectedFulfillTime; // expectedFulfillTime to fulfill data

    // Use an interval in seconds and a timestamp to slow execution of Upkeep
    uint public interval;
    uint public counter;    // Public counter variable
    uint public lastTimeStamp;    

    struct Bid {
        uint256 odd;
        uint256 amount;
        uint256 teamId;
    }

    struct Bidder {
        Bid[] bids;
        bool bidded;
    }

    mapping(address => Bidder) addr2bidder;

    uint256 public winnedTeamId;
    bool public fulfilled; //whether the data is fulfilled

    modifier isOwner() {
        require(msg.sender == owner, "caller is not owner");
        _;
    }

    event RequestScoreFulfilled(
        bytes32 indexed requestId,
        uint256 indexed homescore,
        uint256 indexed awayscore
    );

    function initialize(
        address oracle,
        uint256 _interval,
        uint256 _gameId,
        uint256 _teamId0,
        uint256 _teamId1,
        uint256 _initialOdds0,
        uint256 _initialOdds1,
        uint256 _drawodds,
        address _owner,
        uint256 _expectedFulfillTime
    ) external {
        owner = _owner;
        gameId = _gameId;
        teamId0 = _teamId0;
        teamId1 = _teamId1;
        odds0 = _initialOdds0;
        odds1 = _initialOdds1;
        oddsDraw = _drawodds;
        expectedFulfillTime = _expectedFulfillTime;
        interval = _interval;
        lastTimeStamp = block.timestamp;
        counter = 0;
        setPublicChainlinkToken();
        setChainlinkOracle(oracle);
    }

    function checkUpkeep(bytes calldata checkData) external view override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = !fulfilled && block.timestamp > expectedFulfillTime && (block.timestamp - lastTimeStamp) > interval;
        
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        requestScore("7bf0064504c04021a43b9ebadddfedfb");
        performData;
    }

    // TODO: should be called/triggered by keeper
    function requestScore(string memory _jobId) public isOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillScore.selector
        );
        req.add("gameId", uint2str(gameId));
        requestOracleData(req, ORACLE_PAYMENT);
    }

    function fulfillScore(
        bytes32 _requestId,
        uint256 _homescore,
        uint256 _awayscore
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestScoreFulfilled(_requestId, _homescore, _awayscore);
        homescore = _homescore;
        awayscore = _awayscore;
        winnedTeamId = homescore > awayscore
            ? 0
            : (homescore < awayscore ? 1 : 2);
        fulfilled = true;
    }

    // bid team with teamId to win
    function bid(uint256 _teamId) external payable {
        require(
            _teamId == teamId0 || _teamId == teamId1,
            "can only bid for team involved in this match"
        );
        require(msg.value > 0, "can't bid 0 amount"); //set minimum bid amount?
        addr2bidder[msg.sender].bids.push(
            Bid({
                odd: _teamId == teamId0 ? odds0 : _teamId == teamId1
                    ? odds1
                    : oddsDraw,
                amount: msg.value,
                teamId: _teamId
            })
        );
        addr2bidder[msg.sender].bidded = true;
    }

    // claim
    function claim() external {
        address sender = msg.sender;
        require(addr2bidder[sender].bidded, "can't claim if not bidded before");
        require(
            fulfilled,
            "can't claim before result is fulfilled from oracle"
        );
        uint256 amount = 0;
        for (uint256 i = 0; i < addr2bidder[sender].bids.length; i++) {
            Bid memory curbid = addr2bidder[sender].bids[i];
            if (curbid.teamId == winnedTeamId) {
                amount += (curbid.odd * curbid.amount) / 100; //100 is decimal place for odd
            }
        }
        //make the transfer to sender's account
        require(
            address(this).balance >= amount,
            "not enough balance in the contract to make the transfer"
        );
        if (amount > 0) {
            payable(sender).transfer(amount);
        }
    }

    // enable the contract to receive eth
    receive() external payable {
        //call your function here / implement your actions
    }

    // TODO: need test
    function withdrawLink() public isOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    //----------------utility---------------------------------------------------
    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }
}
