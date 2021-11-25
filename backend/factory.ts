import { Contract } from 'ethers';
import { exec } from 'child_process';

import { getContract } from '../utils/utility';

// TODO: refactor to make it a campaignFactory Manager that support multiple type of factory for different business lines
// An interface layer to interact with campaignFactory
export class CampaignFactory {
  campaignFactory: Contract;
  implementationVerified: boolean;
  // later scale to different sports type, should have different factory type
  constructor(net: string) {
    this.campaignFactory = getContract('CampaignFactory', net);
  }

  // verify the implementation contract of the factory
  async init() {
    if(!this.implementationVerified){
      await this.verifyImplementationContract()
      this.implementationVerified = true
    }
  }

  async createCampaign(
    oracle_addr: string,
    interval: number,
    matchid: number,
    teamid0: number,
    teamid1: number,
    odds0: number,
    odds1: number,
    draw: number,
    checkTime: number
  ) {
    return await this.campaignFactory.createCampaign(
      oracle_addr,
      interval,
      matchid,
      teamid0,
      teamid1,
      odds0,
      odds1,
      draw,
      checkTime
    );
  }

  getFactoryAddress() {
    return this.campaignFactory.address;
  }

  async getImplementationContractAddr() {
    return await this.campaignFactory.implementationContract();
  }

  /**
   * verify the implementation contract on kovan
   * neet to be called every time a new factory is deployed,
   */
  async verifyImplementationContract() {
    let deployedAddr = await this.getImplementationContractAddr();
    const absPath2projectroot = '/mnt/c/users/16073/desktop/clhackathon/themis';
    exec(
      `cd ${absPath2projectroot} && truffle run verify Campaign@${deployedAddr} --network kovan --debug`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }

  async getAddress(_gameId: number) {
    return await this.campaignFactory.getAddress(_gameId);
  }
}
