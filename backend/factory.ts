import { Contract, ethers } from 'ethers';
import { execSync } from 'child_process';

import { getContract } from '../utils/utility';

// TODO: refactor to make it a campaignFactory Manager that support multiple type of factory for different business lines
// An interface layer to interact with campaignFactory
export class CampaignFactory {
  campaignFactory: Contract;
  factoryVerified: boolean;
  implementationVerified: boolean;
  // later scale to different sports type, should have different factory type
  constructor(net: string) {
    this.campaignFactory = getContract('CampaignFactory', net);
  }

  // need to be called everytime try to use a CampaignFactory object
  // make sure contract are verified
  // currently still need to manually or use a background process to do so
  //
  async init() {
    // if(!this.factoryVerified){
    //   await this.verifyFactoryContract()
    //   this.factoryVerified = true
    // }
    if (!this.implementationVerified) {
      await this.verifyImplementationContract();
      this.implementationVerified = true;
    }
  }

  async createCampaign(
    oracle_addr: string,
    interval: number,
    matchid: number,
    odds0: number,
    odds1: number,
    draw: number,
    checkTime: number,
    riskMode: number,
    overrides: object,
  ) {
    return await this.campaignFactory.createCampaign(
      oracle_addr,
      interval,
      matchid,
      odds0,
      odds1,
      draw,
      checkTime,
      riskMode,
      overrides
      // overrides // override
    );
  }

  // return factory deployed address
  getFactoryAddress() {
    return this.campaignFactory.address;
  }

  // return implementation campagin contract address
  async getImplementationContractAddr() {
    return await this.campaignFactory.implementationContract();
  }

  /**
   * getAddress return the deployed campaign address correspdong to a gameId
   */
  async getAddress(_gameId: number) {
    return await this.campaignFactory.getAddress(_gameId);
  }

  /**
   * verify the implementation contract on kovan
   * neet to be called every time a new factory is deployed,
   */
  async verifyImplementationContract() {
    let deployedAddr = await this.getImplementationContractAddr();
    const absPath2projectroot = '/mnt/c/users/16073/desktop/clhackathon/themis';
    const stdout = execSync(
      `cd ${absPath2projectroot} && truffle run verify Campaign@${deployedAddr} --network kovan --debug`
    );
    console.log(stdout);
  }

  /**
   * verify the factory contract on kovan
   * neet to be called every time a new factory is deployed,
   */
  async verifyFactoryContract() {
    let deployedAddr = this.getFactoryAddress();
    const absPath2projectroot = '/mnt/c/users/16073/desktop/clhackathon/themis';
    const stdout = execSync(
      `cd ${absPath2projectroot} && truffle run verify CampaignFactory@${deployedAddr} --network kovan --debug`
    );
    console.log(stdout);
  }
}
