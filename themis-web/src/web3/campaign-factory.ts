import campaignFactoryAbi from '../abis/CampaignFactory.json';
import { Contract } from './moralis-wrapper';

export class CampaignFactory extends Contract {
    constructor() {
        // kovan hardcoded for now
        // let contractAddress = "0xf3a5576ACC965aE84d7F47d3db0aFe4EB5eFc296";
        const contractAddress = ""
        super(campaignFactoryAbi, contractAddress);
    }

    getCloneAddrs() {
        return super.useFunction("getCloneAddrs");
    }
}
