// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Campaign.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract CampaignFactory {
    address public immutable implementationContract;
    // gameId -> deployedAddr
    mapping(uint256 => address) gameId2Addr;
    // address[] public cloneAddress; 

    event Clonecreated(address _address, uint256 _gameId);

    constructor() {
        implementationContract = address(new Campaign());
    }

    // function getCloneAddrs() external view returns (address[] memory) {
    //     return cloneAddress;
    // }
    // get deployed address based on _gameId, return 0x0 if no contract has been deployed for this queried _gameId
    function getAddress(uint256 _gameId) external view returns (address) {
        return gameId2Addr[_gameId];
    }

    function createCampaign(
        address _oracle,
        uint256 _interval,
        uint256 _gameId,
        uint256 _initialOdds0,
        uint256 _initialOdds1,
        uint256 _drawodds,
        uint256 _expectedFulfillTime,
        uint _riskMode
    ) external payable returns (address) {
        address clone = Clones.clone(implementationContract);
        Campaign(payable(clone)).initialize{value:msg.value}(
            _oracle,
            _interval,
            _gameId,
            _initialOdds0,
            _initialOdds1,
            _drawodds,
            msg.sender,
            _expectedFulfillTime,
            _riskMode
        );
        gameId2Addr[_gameId] = clone;
        emit Clonecreated(clone, _gameId);
        return clone;
    }
}
