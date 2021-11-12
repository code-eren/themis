import { providers, Wallet } from 'ethers';
import fs from 'fs';
import { config } from 'dotenv';

config();

console.log(process.env);
// import * as dotenv from 'dotenv'
// dotenv.config();
// require('dotenv').config({ path: require('find-config')('.env') })
// export function getenv()  {console.log(process.env); return process.env;}
//local net
const localjsonrpcprovider = new providers.JsonRpcProvider(
  process.env.LOCALHOST
);
export const localSetup = {
  networkId: 1,
  jsonProvider: localjsonrpcprovider,
  webSocketProvider: null,
  signer: localjsonrpcprovider.getSigner(0)
};

//kovan testnet
const kovanjsonrpcprovider = new providers.JsonRpcProvider(
  process.env.KOVAN_API
);
console.log(process.env);
const privatekey = fs
  .readFileSync(
    process.env.PATH_TO_PK === undefined ? 'default' : process.env.PATH_TO_PK
  )
  .toString()
  .trim();
export const kovanSetup = {
  networkId: 42,
  jsonProvider: kovanjsonrpcprovider,
  webSocketProvider: null,
  signer: new Wallet(privatekey, kovanjsonrpcprovider)
};
