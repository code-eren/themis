const {getContract} = require("../utils/utility.js");

class CampaignFactory {
  //later scale to different sports type, should have different factory type
  constructor(net){
    this.campaignFactory = getContract("CampaignFactory", net);
  }

  async createCampaign(oracle_addr, matchid, teamid0, teamid1, odds0, odds1){
    return await this.campaignFactory.createCampaign(oracle_addr, matchid, teamid0, teamid1, odds0, odds1);
  }

  async getCloneAddrs(){
    return await this.campaignFactory.getCloneAddrs();
  }

}

// (async () => {
//   cf = new CampaignFactory("kovan");
//   // let tx = await cf.createCampaign("0xC25d00698c4c48557B363F35AFe09d8f7907296c", 702, 0, 1, 410, 110);
//   // console.log(tx);
//   console.log(await cf.getCloneAddrs());
// })();

module.exports = {CampaignFactory}


