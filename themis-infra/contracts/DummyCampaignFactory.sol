// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DummyCampaign.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract DummyCampaignFactory {
    address public immutable implementationContract;
    // gameId -> deployedAddr
    mapping(uint256 => address) gameId2Addr;
    // address[] public cloneAddress; 

    event Clonecreated(address _address, uint256 _gameId);

    constructor() {
        implementationContract = address(new DummyCampaign());
    }

    // function getCloneAddrs() external view returns (address[] memory) {
    //     return cloneAddress;
    // }
    // get deployed address based on _gameId, return 0x0 if no contract has been deployed for this queried _gameId
    function getAddress(uint256 _gameId) external view returns (address) {
        return gameId2Addr[_gameId];
    }

    function createCampaign(
        uint256 _gameId,
        uint256 _teamId0,
        uint256 _teamId1,
        uint256 _initialOdds0,
        uint256 _initialOdds1,
        uint256 _drawodds
    ) external returns (address) {
        address clone = Clones.clone(implementationContract);
        DummyCampaign(payable(clone)).initialize(
            _gameId,
            _teamId0,
            _teamId1,
            _initialOdds0,
            _initialOdds1,
            _drawodds,
            msg.sender
        );
        gameId2Addr[_gameId] = clone;
        emit Clonecreated(clone, _gameId);
        return clone;
    }
}
