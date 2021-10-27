const HelloWorld = artifacts.require("HelloWorld");
const Campaign = artifacts.require("Campaign");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(HelloWorld, "hi, themis, let's go!");
  await deployer.deploy(Campaign, 1, 0, 1, 450, 110);
};