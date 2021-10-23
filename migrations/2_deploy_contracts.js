const HelloWorld = artifacts.require("HelloWorld");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(HelloWorld, "hi, themis, let's go!");
};