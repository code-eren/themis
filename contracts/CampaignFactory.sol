// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Campaign.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract CampaignFactory {
    address public immutable implementationContract;
    address[] public cloneAddress; 

    event Clonecreated(address _address);

    constructor() {
        implementationContract = address(new Campaign());
    }

    function getCloneAddrs() external view returns (address[] memory) {
        return cloneAddress;
    }

    function createCampaign(
        address _oracle,
        uint256 _matchId,
        uint256 _teamId0,
        uint256 _teamId1,
        uint256 _initialOdds0,
        uint256 _initialOdds1
    ) external returns (address) {
        address clone = Clones.clone(implementationContract);
        Campaign(payable(clone)).initialize(
            _oracle,
            _matchId,
            _teamId0,
            _teamId1,
            _initialOdds0,
            _initialOdds1,
            msg.sender
        );
        cloneAddress.push(clone);
        emit Clonecreated(clone);
        return clone;
    }
}
