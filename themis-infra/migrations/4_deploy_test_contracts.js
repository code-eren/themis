const DummyCampaignFactory = artifacts.require("DummyCampaignFactory");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(DummyCampaignFactory);
};
