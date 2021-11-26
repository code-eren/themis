const { Wallet, Contract, ethers } = require('ethers');
import { kovanSetup } from '../../utils/setup';
import registryABI from './registryABI.json';
class KeeperRegistry {
  //same for kovan and mainnet
  registryAddr = '0x245211139EB8Dec0A2a4b4D7dcC21a0f6b1Ce863';
  link = '0xa36085F69e2889c224210F603D836748e7dC0088';
  linkabi = [
    'function transferAndCall(address to, uint256 value, bytes memory data) external returns (bool)'
  ];
  abi = [
    'function register(string memory name,bytes calldata encryptedEmail,address upkeepContract,uint32 gasLimit,address adminAddress,bytes calldata checkData,uint96 amount,uint8 source) external onlyLINK()'
  ];
  // abi = ["function registerUpkeep(address target, uint32 gasLimit, address admin, bytes calldata checkData) external override onlyOwnerOrRegistrar() returns (uint256 id)"]
  signer = kovanSetup.signer;
  registry = new Contract(this.registryAddr, registryABI, this.signer);
  linkcontract = new Contract(this.link, this.linkabi, this.signer);
  //need to prepare checkData

  async register(
    name,
    encryptedEmail,
    upkeepContract,
    gasLimit,
    adminAddress,
    checkData,
    amount,
    source
  ) {
    let iface = new ethers.utils.Interface(registryABI);
    // console.log(iface);
    let paramtuple: [
      string,
      string,
      string,
      number,
      string,
      string,
      number,
      number
    ] = [
      'testKeeper',
      ethers.utils.formatBytes32String('encryptedemail'),
      '0xF98a6DE901a1773Ea9d0A4B1CBDC8022A4025654',
      200000,
      '0x393E5f28F1ecF889E9344288ccDae19353FBf9FB',
      ethers.utils.formatBytes32String(''),
      ethers.utils.parseUnits('19', 18),
      0
    ];
    let calldata = iface.encodeFunctionData('register', paramtuple);
    console.log(calldata);

    let tx = await this.linkcontract.transferAndCall(
      this.registryAddr,
      ethers.utils.parseUnits('20', 18),
      calldata
    );
    console.log(tx);
  }
}

let keeperr = new KeeperRegistry();
(async () => {
  let tx = await keeperr.register(
    '',
    '',
    '0x3B7c996A8976A632f622eE00CBE3f8ca73E5C553',
    200000,
    kovanSetup.signer.address,
    '',
    '',
    ethers.utils.hexlify(42)
  );
  console.log(tx);
})();
