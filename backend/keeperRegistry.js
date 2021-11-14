const { Wallet, Contract, ethers } = require("ethers");
const { kovanSetup } = require("../utils/setup.js");
class KeeperRegistry {
  //same for kovan and mainnet
  registryAddr = "0x245211139EB8Dec0A2a4b4D7dcC21a0f6b1Ce863";
  link = "0xa36085F69e2889c224210F603D836748e7dC0088";
  abi = ["function register(string memory name,bytes calldata encryptedEmail,address upkeepContract,uint32 gasLimit,address adminAddress,bytes calldata checkData,uint96 amount,uint8 source) external onlyLINK()"]
  // abi = ["function registerUpkeep(address target, uint32 gasLimit, address admin, bytes calldata checkData) external override onlyOwnerOrRegistrar() returns (uint256 id)"]
  linkabi = signer = kovanSetup.signer;
  registry = new Contract(this.registryAddr, this.abi, this.signer);
  //need to prepare checkData
  async register(name, encryptedEmail, upkeepContract, gasLimit, adminAddress, checkData, amount, source){
    
    await this.registry.registerUpkeep(targetAddr, gasLimit, admin, checkData);
  }

}

keeperr = new KeeperRegistry();
(async() => {
  let tx = await keeperr.register("0x3B7c996A8976A632f622eE00CBE3f8ca73E5C553", 200000, kovanSetup.signer.address, ethers.utils.hexlify(42));
  console.log(tx);
})()