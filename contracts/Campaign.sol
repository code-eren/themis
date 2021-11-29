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
    int public odds0; // odd that team0 wins 1.1 -> 110 , bid 1, get 1.1 back
    int public odds1; // odd that team1 wins 4.1 -> 410 , bid 1, get 4.1 back
    int public oddsDraw; // odd of draw wins 3   -> 300 , bid 1, get 3 back
    uint256 public expectedFulfillTime; // expectedFulfillTime to fulfill data
    // normally a bit earlier than the expected end of the match,
    // should also be periodically fulfilled by the keeper to keep updated with real-world situation
    uint256 public bidDeadline; 

    // Use an interval in seconds and a timestamp to slow execution of Upkeep
    uint public interval;
    uint public lastTimeStamp;    

    // risk control
    // cumulative value
    int public homepayoff; // 100x the total value we need to pay if home team win, negative if the contract can have additional value after all valid user cleared
    int public awaypayoff; // 100x the total value we need to pay if away team win, ^
    int public drawpayoff; // 100x the total value we need to pay if it's draw, ^
    // risk mode of this contract, can be 0, 1, 2 -> low, medium, high 
    // risk mode controls two things: 
    // 1. maxTolenrance
    // 2. how dynamic odds are adjusted
    uint public riskMode;
    // max payoff we can tolerate (currently at any give time of the contract life, can add risk-taking later) 
    int[] public riskMode2maxTolerance;

    uint public amountBidOnHomeTeam;
    uint public amountBidOnAwayTeam;
    uint public amountBidOnDraw;

    int public xyratio_lower;
    int public xyratio_upper;
    int public xzratio_lower;
    int public xzratio_upper;
    int public yzratio_lower;
    int public yzratio_upper;

    uint public numOfUniqueAddrBidded;
    uint public numOfAddrClaimed;

    struct Bid {
        int odd;
        uint256 amount;
        uint256 teamId;
    }

    struct Bidder {
        Bid[] bids;
        bool bidded;
    }

    mapping(address => Bidder) public addr2bidder;

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

    event Performupkeepcalled(
        address indexed performer
    );

    event BidSuccess(
        address indexed bidder,
        uint256 indexed amount, 
        uint256 indexed side
    );

    event RiskModeSet(
        uint256 indexed margin,
        uint indexed riskMode,
        address indexed setter
    );

    function initialize(
        address oracle,
        uint256 _interval,
        uint256 _gameId,
        int _initialOdds0,
        int _initialOdds1,
        int _drawodds,
        address _owner,
        uint256 _expectedFulfillTime,
        uint _riskMode
    ) payable external {
        require(_riskMode == 0 || _riskMode == 1 || _riskMode == 2, "only support 3 level of riskMode");
        riskMode2maxTolerance.push(int(0.01 * 1e18)); // riskMode 0
        riskMode2maxTolerance.push(int(0.05 * 1e18)); // riskMode 1
        riskMode2maxTolerance.push(int(0.1 * 1e18)); // riskMode 2
        require(int(msg.value) >= riskMode2maxTolerance[_riskMode], "not enough margin to create a campaign with correspoding riskmode");
        owner = _owner;
        gameId = _gameId;
        odds0 = _initialOdds0;
        odds1 = _initialOdds1;
        oddsDraw = _drawodds;
        expectedFulfillTime = _expectedFulfillTime;
        interval = _interval;
        lastTimeStamp = block.timestamp;
        // random number,
        // note claim can only be executed once data is fulfilled, 
        // so this number really can be anything, since it will be always reset before claim
        winnedTeamId = 42; 
        bidDeadline = block.timestamp + 86400;
        int potential_v1 = (_initialOdds1 * _drawodds - _initialOdds1 - _drawodds) / _drawodds;
        int potential_v2 = _drawodds / ((_initialOdds0 * _drawodds) / 100 - _initialOdds0 - _drawodds);
        if (potential_v1 < potential_v2) {
            xyratio_lower = potential_v1 < 0 ? int(0) : potential_v1;
            xyratio_upper = potential_v2 < 0 ? int(0) : potential_v2;
        }else{
            xyratio_lower = potential_v2 < 0 ? int(0) : potential_v2;
            xyratio_upper = potential_v1 < 0 ? int(0) : potential_v1;
        }
        potential_v1 = (_initialOdds1 * _drawodds - _initialOdds1 - _drawodds) / _initialOdds1;
        potential_v2 = _initialOdds1 / ((_initialOdds0 *  _initialOdds1) / 100 - _initialOdds0 -  _initialOdds1);
         if (potential_v1 < potential_v2) {
            xzratio_lower = potential_v1 < 0 ? int(0) : potential_v1;
            xzratio_upper  =   potential_v2 < 0 ? int(0) : potential_v2;
        }else{
            xzratio_lower = potential_v2 < 0 ? int(0) : potential_v2;
            xzratio_upper  =  potential_v1 < 0 ? int(0) : potential_v1;
        }
        potential_v1 = (_initialOdds0 * _drawodds - _initialOdds0 - _drawodds) / _initialOdds0;
        potential_v2 = _initialOdds0  / ((_initialOdds0 * _initialOdds1) / 100 - _initialOdds0 - _initialOdds1);
         if (potential_v1 < potential_v2) {
            yzratio_lower = potential_v1 < 0 ? int(0) : potential_v1;
            yzratio_upper =  potential_v2 < 0 ? int(0) : potential_v2;
        }else{
            yzratio_lower = potential_v2 < 0 ? int(0) : potential_v2;
            yzratio_upper =  potential_v1 < 0 ? int(0) : potential_v1;
        }
        riskMode = _riskMode;
        emit RiskModeSet(msg.value, _riskMode, msg.sender);
        setPublicChainlinkToken();
        setChainlinkOracle(oracle);
    }

    function checkUpkeep(bytes calldata checkData) external view override returns (bool upkeepNeeded, bytes memory performData) {
        // upkeep needed if 
        // 1. game result hasn't been fulfilled
        // 2. game result is ready for fetching
        // 3. periodically check whether data is ready 
        upkeepNeeded = !fulfilled && (block.timestamp > expectedFulfillTime) && (block.timestamp - lastTimeStamp) > interval;
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        emit Performupkeepcalled(msg.sender);
        lastTimeStamp = block.timestamp;
        // preset jobId 
        // TODO change it to query from aggragator
        requestScore("7bf0064504c04021a43b9ebadddfedfb");
        performData;
    }

    function requestScore(string memory _jobId) public {
        require(msg.sender == 0x4Cb093f226983713164A62138C3F718A5b595F73, "requestScore should only be called by keeper");
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

    event NewHomepayoff(
        int indexed newHomepayoff,
        int indexed maxTolerance
    );

    // bid team with teamId to win
    // 0: hometeam
    // 1: awayteam
    // 2: draw
    function bid(uint256 _teamId) external payable {
        // can only bid if data hasn't been fulfilled and earlier than the deadline
        require(!fulfilled && block.timestamp < bidDeadline,
         "the contract already been fulfilled or the bid deadline has been passed");
        // currently this bid api can only be win/lose/draw
        // later can support bid on score
        require(
            _teamId == 0 || _teamId == 1 || _teamId == 2,
            "can only bid win, lose, or draw"
        );
        // must bid positive amount
        require(msg.value > 0, "can't bid 0 amount"); //set minimum bid amount?
        // TODO set a maximum bid amount
        
        // check whether potential payoff would exceed maxTolerance
        if (_teamId == 0){
            require(((homepayoff + int(msg.value) * int(odds0))/100) <= riskMode2maxTolerance[riskMode],
            concat(uint2str(uint((homepayoff + int(msg.value) * int(odds0))/100)),
            uint2str(uint(riskMode2maxTolerance[riskMode]))));
        }else if (_teamId == 1){
            require(((awaypayoff + int(msg.value) * int(odds1))/100) <= riskMode2maxTolerance[riskMode],
            "potential payoff would exceed maxTolerance");
        }else{
            require(((drawpayoff + int(msg.value) * int(oddsDraw))/100) <= riskMode2maxTolerance[riskMode],
            "potential payoff would exceed maxTolerance");
        }

        // adjust odds and risk control computation
        // see our lite paper on how this is designed and work in detail
        if (_teamId == 0){
            // bid on hometeam
            amountBidOnHomeTeam += msg.value;
            awaypayoff -= int(msg.value); // assume accuracy loss is not an issue here, should not allow bid too much money anyway
            drawpayoff -= int(msg.value);
            homepayoff += int(msg.value) * int(odds0);
            int idealxy = xyratio_upper;
            int deltaoddsxy = odds0 * (((idealxy * int(amountBidOnAwayTeam)) / 100 - int(amountBidOnHomeTeam)) / int(amountBidOnHomeTeam));
            int idealxz = xzratio_upper;
            int deltaoddsxz = odds0 * (((idealxz * int(amountBidOnDraw)) / 100 - int(amountBidOnHomeTeam)) / int(amountBidOnHomeTeam));
            int changeInOdd0 = 0;
            if (deltaoddsxy < 0 && deltaoddsxz < 0) {
                changeInOdd0 = deltaoddsxy < deltaoddsxz ? deltaoddsxy : deltaoddsxz;
            }else if (deltaoddsxy > 0 && deltaoddsxz > 0){
                changeInOdd0 = deltaoddsxy > deltaoddsxz ? deltaoddsxy : deltaoddsxz;
            }
            odds0 = (odds0 + changeInOdd0) < 0 ? int(0) : (odds0 + changeInOdd0);
        }else if (_teamId == 1){
            // bid on awayteam
            amountBidOnAwayTeam += msg.value;
            homepayoff -= int(msg.value); 
            drawpayoff -= int(msg.value);
            awaypayoff += int(msg.value) * int(odds1);
            int idealyx =  1 / xyratio_upper;
            int deltaoddsyx = odds1 * (((idealyx * int(amountBidOnHomeTeam)) / 100 - int(amountBidOnAwayTeam)) / int(amountBidOnAwayTeam));
            int idealyz = yzratio_upper;
            int deltaoddsyz = odds1 * (((idealyz * int(amountBidOnDraw)) / 100 - int(amountBidOnAwayTeam)) / int(amountBidOnAwayTeam));
            int changeInOdd1 = 0;
            if (deltaoddsyx < 0 && deltaoddsyz < 0) {
                changeInOdd1 = deltaoddsyx < deltaoddsyz ? deltaoddsyx : deltaoddsyz;
            }else if (deltaoddsyx > 0 && deltaoddsyz > 0){
                changeInOdd1 = deltaoddsyx > deltaoddsyz ? deltaoddsyx : deltaoddsyz;
            }
            odds1 = (odds1 + changeInOdd1) < 0 ? int(0) : (odds1 + changeInOdd1);
        }else{
            // bid on draw
            amountBidOnDraw += msg.value;
            homepayoff -= int(msg.value);
            drawpayoff -= int(msg.value);
            drawpayoff += int(msg.value) * int(oddsDraw);
            int idealzx = 1 / xzratio_upper;
            int deltaoddszx = oddsDraw * (((idealzx * int(amountBidOnHomeTeam)) / 100 - int(amountBidOnDraw)) / int(amountBidOnDraw));
            int idealzy = 1 / yzratio_upper;
            int deltaoddszy = oddsDraw * (((idealzy * int(amountBidOnAwayTeam)) / 100 - int(amountBidOnDraw)) / int(amountBidOnDraw));
            int changeInDraw = 0;
            if (deltaoddszx < 0 && deltaoddszy < 0) {
                changeInDraw = deltaoddszx < deltaoddszy ? deltaoddszx : deltaoddszy;
            }else if (deltaoddszx > 0 && deltaoddszy > 0){
                changeInDraw = deltaoddszx > deltaoddszy ? deltaoddszx : deltaoddszy;
            }
            oddsDraw = (oddsDraw + changeInDraw) < 0 ? int(0) : (oddsDraw + changeInDraw);
        }

        // if it's a new address, increment numOfUniqueAddrBidded
        if (!addr2bidder[msg.sender].bidded){
            numOfUniqueAddrBidded += 1;
        }
        
        // push the bid to addr2bidder
        addr2bidder[msg.sender].bids.push(
            Bid({
                odd: _teamId == 0 ? odds0 : _teamId == 1
                    ? odds1
                    : oddsDraw,
                amount: msg.value,
                teamId: _teamId
            })
        );
        // set bidded as true
        addr2bidder[msg.sender].bidded = true;

        emit BidSuccess(msg.sender, msg.value, _teamId);    
    }

    event Claimed(
        address indexed claimer,
        int indexed amount
    );

    // claim
    function claim() external {
        address sender = msg.sender;
        require(addr2bidder[sender].bidded, "can't claim if not bidded before or already claimed");
        require(
            fulfilled,
            "can't claim before result is fulfilled from oracle"
        );
        int amount = 0;
        for (uint256 i = 0; i < addr2bidder[sender].bids.length; i++) {
            Bid memory curbid = addr2bidder[sender].bids[i];
            if (curbid.teamId == winnedTeamId) {
                amount += (curbid.odd * int(curbid.amount)) / 100; //100 is decimal place for odd
            }
        }
        //make the transfer to sender's account
        require(
            address(this).balance >= uint(amount),
            "not enough balance in the contract to make the transfer"
        );
        if (amount > 0) {
            payable(sender).transfer(uint(amount));
        }
        // set it to false so can't claim again
        addr2bidder[sender].bidded = false;
        // increment the unique address that has been claimed
        numOfAddrClaimed++;
        emit Claimed(sender, amount);
    }

    // enable the contract to receive eth
    receive() external payable {
        //call your function here / implement your actions
    }

    // TODO: need test
    function withdrawLink() public isOwner {
        require(fulfilled, "can't retrive link out until the data has been fulfilled");
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    // withdraw eth after all bidders have claimed (TODO: or expired to avoid block) 
    function payout () public isOwner returns(bool res) {
        require(numOfAddrClaimed >= numOfUniqueAddrBidded, "can't retrive eth out since some bidder hasn't claimed");
        payable(owner).transfer(address(this).balance);
        return true;
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

    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);

        uint i;
        uint j;

        for(i=0; i<_baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
        }

        return string(_newValue);
    }
}
