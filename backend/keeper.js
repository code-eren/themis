//Just a temporary test file

const {getContract} = require("../utils/utility.js");

let counterContract = getContract("Counter", "kovan");

//use the returned value for frontend other stuff
(async()=>{
  let x = await counterContract.counter();
  console.log(x);
})();
