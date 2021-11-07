const { Wallet, Contract, ethers } = require("ethers");
const { kovanSetup } = require("../utils/setup.js");
class KeeperRegistry {
  //same for kovan and mainnet
  registryAddr = "0x4Cb093f226983713164A62138C3F718A5b595F73";
  abi = ["function registerUpkeep(address target,uint32 gasLimit,address admin, bytes calldata checkData) external returns (uint256 id)"]
  // abi = ["function registerUpkeep(address target, uint32 gasLimit, address admin, bytes calldata checkData) external override onlyOwnerOrRegistrar() returns (uint256 id)"]
  
  signer = kovanSetup.signer;
  registry = new Contract(this.registryAddr, this.abi, this.signer);
  //need to prepare checkData
  async register(targetAddr, gasLimit, admin, checkData){
    await this.registry.registerUpkeep(targetAddr, gasLimit, admin, checkData);
  }

}

keeperr = new KeeperRegistry();
(async() => {
  let tx = await keeperr.register("0x3B7c996A8976A632f622eE00CBE3f8ca73E5C553", 200000, kovanSetup.signer.address, ethers.utils.hexlify(42));
  console.log(tx);
})()