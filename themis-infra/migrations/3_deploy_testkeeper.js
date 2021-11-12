const Counter  = artifacts.require("Counter");

//deploy the keepr example Counter
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Counter, 15);
};