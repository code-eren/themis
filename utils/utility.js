const {ethers, Contract} = require('ethers');
const {localSetup, kovanSetup} = require("../utils/setup.js");


// var str = new Array(32).join('0');

// console.log(str+"c89ee5e0590a4f4c8017bae5f9724fcf");

/**
 * @param {string} contract - contractName
 * @param {string} net - "local" | "kovan"
 */
function getContract(contract, net, deployedaddr = "") {
  var networkId;
  var signer;
  switch (net) {
    case "local":
      networkId = localSetup.networkId;
      signer = localSetup.signer;
      break;
    case "kovan":
      networkId = kovanSetup.networkId;
      signer = kovanSetup.signer;
      break;
    //add more net
    default:
      throw "unsupported net"
  }
  const contractJson = require("../build/contracts/" + contract + ".json");
  if(deployedaddr == ""){
    deployedaddr = contractJson["networks"][networkId.toString()]["address"];
  }
  return new Contract(deployedaddr, contractJson.abi, signer);
}

/**
 * @param {string} tokenAddr - token contract address, LINK "0xa36085F69e2889c224210F603D836748e7dC0088"
 * @param {string} amount - '1.0'
 * @param {int} decimal - 18
 * @param {string} toAddr 
 * @param {string} net - "local" | "kovan"
 */
 async function sendToken(tokenAddr, amount, decimal, toAddr, net) {
  // Connect to the contract
  var contractAbiFragment = [
    {
        "name" : "transfer",
        "type" : "function",
        "inputs" : [
          {
              "name" : "_to",
              "type" : "address"
          },
          {
              "type" : "uint256",
              "name" : "_tokens"
          }
        ],
        "constant" : false,
        "outputs" : [],
        "payable" : false
    }
  ];
  var signer;
  switch (net) {
    case "local":
      signer = localSetup.signer;
      break;
    case "kovan":
      signer = kovanSetup.signer;
      break;
    default:
      throw "unsupported net"
  }
  var contract = new ethers.Contract(tokenAddr, contractAbiFragment, signer);

  // How many tokens?
  
  var numberOfTokens = ethers.utils.parseUnits(amount, decimal);

  // Send tokens
  let tx = await contract.transfer(toAddr, numberOfTokens);
  console.log(tx);

}

/**
 * @param {string} transactionHash - txHash
 * @param {string} net - "local" | "kovan"
 */
 async function checkTransactionConfirmed(transactionHash, net) {
  var txReceipt;
  switch (net) {
    case "local":
      txReceipt = await kovanSetup.jsonProvider.getTransactionReceipt(transactionHash);
      break;
    case "kovan":
      txReceipt = await localSetup.jsonProvider.getTransactionReceipt(transactionHash);
      break;
    default:
      throw "unsupported net"
  }

  if (txReceipt && txReceipt.blockNumber) {
      return txReceipt;
  }

}

module.exports = {getContract, sendToken, checkTransactionConfirmed}