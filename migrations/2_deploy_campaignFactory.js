const CampaignFactory = artifacts.require("CampaignFactory");

//deploy the CampaginFactory
module.exports = async function (deployer, network, accounts) {
  if (network != "kovan") {
    console.log("currently doesnt' support network other than kovan")
    return
  }

  // deployment steps
 deployer.deploy(CampaignFactory).then(() => {
  deployedAddr = CampaignFactory.address;
  const execSync = require('child_process').execSync;
  const output = execSync(`truffle run verify CampaignFactory@${deployedAddr} --network kovan`, { encoding: 'utf-8' });  // the default is 'buffer'
  console.log('Output was:\n', output);
  });
}