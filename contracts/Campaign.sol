// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Campaign {
    address private owner;
    uint256 public matchId;
    uint256 public teamId0;
    uint256 public teamId1;
    uint256 public odds0;
    uint256 public odds1;

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

    modifier isOwner() {
        require(msg.sender == owner, "caller is not owner");
        _;
    }

    uint256 winnedTeamId;
    bool fulfilled; //whether the data is fulfilled

    function initialize(
        uint256 _matchId,
        uint256 _teamId0,
        uint256 _teamId1,
        uint256 _initialOdds0,
        uint256 _initialOdds1,
        address _owner
    ) external {
        owner = _owner;
        matchId = _matchId;
        teamId0 = _teamId0;
        teamId1 = _teamId1;
        odds0 = _initialOdds0;
        odds1 = _initialOdds1;
    }

    //TODO replace with an oracle that provides match result data, or build our own, and change teamId accordingly
    function fulfill() external {
        winnedTeamId = 1;
        fulfilled = true;
    }

    //bid team with teamId to win
    function bid(uint256 _teamId) external payable {
        require(
            _teamId == teamId0 || _teamId == teamId1,
            "can only bid for team involved in this match"
        );
        require(msg.value > 0, "can't bid 0 amount"); //set minimum bid amount?
        addr2bidder[msg.sender].bids.push(
            Bid({
                odd: _teamId == teamId0 ? odds0 : odds1,
                amount: msg.value,
                teamId: _teamId
            })
        );
        addr2bidder[msg.sender].bidded = true;
    }

    //claim
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

    receive() external payable {
        //call your function here / implement your actions
    }
}
