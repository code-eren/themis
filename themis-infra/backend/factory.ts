import { Contract } from 'ethers';

import { getContract } from '../utils/utility';

export class CampaignFactory {
  campaignFactory: Contract;
  //later scale to different sports type, should have different factory type
  constructor(net: string) {
    this.campaignFactory = getContract('CampaignFactory', net);
  }

  async createCampaign(
    oracle_addr: string,
    matchid: number,
    teamid0: number,
    teamid1: number,
    odds0: number,
    odds1: number,
    draw: number
  ) {
    return await this.campaignFactory.createCampaign(
      oracle_addr,
      matchid,
      teamid0,
      teamid1,
      odds0,
      odds1,
      draw
    );
  }

  // async getCloneAddrs(){
  //   return await this.campaignFactory.getCloneAddrs();
  // }

  async getAddress(_gameId: number) {
    return await this.campaignFactory.getAddress(_gameId);
  }
}

// (async () => {
//   cf = new CampaignFactory("kovan");
//   // let tx = await cf.createCampaign("0xC25d00698c4c48557B363F35AFe09d8f7907296c", 702, 0, 1, 410, 110);
//   // console.log(tx);
//   console.log(await cf.getCloneAddrs());
// })();