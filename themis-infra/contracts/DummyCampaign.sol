// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract DummyCampaign {
    // match data
    uint256 public homeScore;
    uint256 public awayScore;
    
    address private owner;
    uint256 public gameId;
    uint256 public teamId0; // TODO: probably don't need it, need to ensure consistency
    uint256 public teamId1; // TODO: probably don't need it, need to ensure consistency
    uint256 public odds0; // odd that team0 wins 1.1 -> 110 , bid 1, get 1.1 back
    uint256 public odds1; // odd that team1 wins 4.1 -> 410 , bid 1, get 4.1 back
    uint256 public oddsDraw; // odd of draw wins 3   -> 300 , bid 1, get 3 back
    
    // bid data
    event RequestScoreFulfilled(
        bytes32 indexed requestId,
        uint256 indexed homescore,
        uint256 indexed awayscore
    );

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
    
    event NewBidCreated(
        address bidder,
        Bid bid
    );
    
    // result data
    uint256 public winnedTeamId;
    bool public fulfilled; //whether the data is fulfilled
    
    function initialize(
        uint256 _gameId,
        uint256 _teamId0,
        uint256 _teamId1,
        uint256 _initialOdds0,
        uint256 _initialOdds1,
        uint256 _drawodds,
        address _owner
    ) external {
        owner = _owner;
        gameId = _gameId;
        teamId0 = _teamId0;
        teamId1 = _teamId1;
        odds0 = _initialOdds0;
        odds1 = _initialOdds1;
        oddsDraw = _drawodds;
    }
    
    function bid(uint256 _teamId) external payable {
        require(
            _teamId == teamId0 || _teamId == teamId1,
            "can only bid for team involved in this match"
        );
        require(msg.value > 0, "can't bid 0 amount"); //set minimum bid amount?
        Bid memory newBid = Bid({
            odd: _teamId == teamId0 ? odds0 : _teamId == teamId1
                ? odds1
                : oddsDraw,
            amount: msg.value,
            teamId: _teamId
        });
        addr2bidder[msg.sender].bids.push(newBid);
        addr2bidder[msg.sender].bidded = true;
        emit NewBidCreated(msg.sender, newBid);
    }
    
    function fulfillScore(
        bytes32 _requestId,
        uint256 _homescore,
        uint256 _awayscore
    ) public {
        emit RequestScoreFulfilled(_requestId, _homescore, _awayscore);
        homeScore = _homescore;
        awayScore = _awayscore;
        winnedTeamId = _homescore > _awayscore
            ? teamId0
            : (_homescore < _awayscore ? teamId1 : 2);
        fulfilled = true;
    }
    
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
}