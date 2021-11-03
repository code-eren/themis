const {getContract} = require("../utils/utility.js");

class CampaignFactory {
  //later scale to different sports type, should have different factory type
  constructor(){
    this.campaignFactory = getContract("CampaignFactory", "local");
  }

  async createCampaign(matchid, teamid0, teamid1, odds0, odds1){
    return await this.campaignFactory.createCampaign(matchid, teamid0, teamid1, odds0, odds1);;
  }

  async getCloneAddrs(){
    return await this.campaignFactory.getCloneAddrs();
  }

}

(async () => {
  cf = new CampaignFactory();
  console.log(await cf.getCloneAddrs());
})();