const {providers, Wallet} = require('ethers')
const fs = require('fs');
require('dotenv').config();

//local net
localjsonrpcprovider = new providers.JsonRpcProvider(process.env.LOCALHOST);
const localSetup = {
  networkId: 1,
  jsonProvider: localjsonrpcprovider,
  webSocketProvider: null,
  signer: localjsonrpcprovider.getSigner(0),
};

//kovan testnet
kovanjsonrpcprovider = new providers.JsonRpcProvider(process.env.KOVAN_API);
privatekey = fs.readFileSync(".pk").toString().trim();
const kovanSetup = {
  networkId: 42,
  jsonProvider: kovanjsonrpcprovider,
  webSocketProvider: null,
  signer: new Wallet(privatekey, kovanjsonrpcprovider),
};

module.exports = {localSetup, kovanSetup}