const {Contract, providers} = require('ethers');

//retrive the contract's json
const helloworldjson = require("../build/contracts/HelloWorld.json")

//define networkid
const networkId = 1;

//get hellow world contract deployed address
const HWdeployedAddr = helloworldjson["networks"][networkId.toString()]["address"]

//local blockchain's listernning address
const localAddr = process.env.LOCALHOST;
const testrpcprovider = new providers.JsonRpcProvider(localAddr);
const signer = testrpcprovider.getSigner(0);
//create contract instance
let hellowolrdContract = new Contract(HWdeployedAddr, helloworldjson.abi, signer);

//use the returned value for frontend other stuff
(async()=>{
  var message = await hellowolrdContract.getMessage();
  console.log(message); //it this is first time run, should print out "hi, themis, let's go!"
  //send tx 
  let tx = await hellowolrdContract.update("thinking about the security...");
  //console.log(tx);
  var newmessage = await hellowolrdContract.getMessage();
  console.log(newmessage);//should print out "thinking about the security..."
})();


