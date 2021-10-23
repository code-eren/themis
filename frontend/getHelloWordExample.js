const {Contract, providers} = require('ethers');

//retrive the contract's json
const helloworldjson = require("../build/contracts/HelloWorld.json")

//define networkid
const networkId = 1;

//get hellow world contract deployed address
const HWdeployedAddr = helloworldjson["networks"][networkId.toString()]["address"]

//local blockchain's listernning address
const localAddr = "http://localhost:8545";
const testrpcprovider = new providers.JsonRpcProvider(localAddr);
const signer = testrpcprovider.getSigner(0);
//create contract instance
let hellowolrdContract = new Contract(HWdeployedAddr, helloworldjson.abi, signer);

//use the returned value for frontend other stuff
(async()=>{
  var message = await hellowolrdContract.getMessage();
  console.log(message); //should print out "hi, themis, let's go!"
})();

//send tx 
//TODO add an example that requires a tx being sent