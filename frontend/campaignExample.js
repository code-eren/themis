const {Contract, providers, ethers} = require('ethers');

//retrive the contract's json
const campaignJson = require("../build/contracts/Campaign.json")

//define networkid
const networkId = 1;

//get hellow world contract deployed address
const cdeployedAddr = campaignJson["networks"][networkId.toString()]["address"]

//local blockchain's listernning address
const localAddr = "http://localhost:8545";
const testrpcprovider = new providers.JsonRpcProvider(localAddr);
const signer = testrpcprovider.getSigner(0);
//create contract instance
let campaignContract = new Contract(cdeployedAddr, campaignJson.abi, signer);

//use the returned value for frontend other stuff
(async()=>{
  //bid 0.01 ether on team 1
  let amountBid = '0.01' 
  let tx = await campaignContract.bid(1, {value: ethers.utils.parseEther(amountBid)});
  console.log("successfully bid");
  console.log(tx); 

  let amountSent = '1'
  tx = signer.sendTransaction({
    to: cdeployedAddr,
    value: ethers.utils.parseEther(amountSent)
  })

  console.log("successfully sent");
  console.log(tx); 

  //fulfill the score, should be called by keeper though
  tx = await campaignContract.fulfill();
  console.log("successfully fulfill");
  console.log(tx);

  tx = await campaignContract.claim();

  console.log("successfully claimed");
  console.log(tx);

})();
