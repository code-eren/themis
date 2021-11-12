import campaignFactoryAbi from '../abis/CampaignFactory.json';
import { Contract } from './moralis-wrapper';

export class CampaignFactory extends Contract {
    constructor(contractAddress: string) {
        super(campaignFactoryAbi, contractAddress);
    }

    getCloneAddrs() {
        super.useFunction("createCampaign");
    }
}
