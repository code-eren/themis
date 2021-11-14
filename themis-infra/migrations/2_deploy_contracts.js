const HelloWorld = artifacts.require("HelloWorld");
const Campaign = artifacts.require("Campaign");

const CampaignFactory = artifacts.require("CampaignFactory");

//deploy the CampaginFactory
module.exports = async function (deployer, network, accounts) {
  // deployment steps
  // await deployer.deploy(HelloWorld, "hi, themis, let's go!");
  // await deployer.deploy(Campaign, 1, 0, 1, 450, 110);
  await deployer.deploy(CampaignFactory);
  // await deployer.deploy(Counter, 15);
};
