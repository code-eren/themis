import { Moralis } from 'moralis';
import Campaign from '../abis/Campaign.json';
import { Contract } from './moralis-wrapper';

export class CampaignContract extends Contract {
    constructor(contractAddress: string) {
        super(Campaign.abi, contractAddress);
    }

    bid(_teamId: string, amount: string) {
        return {
            ...this.metadata(),
            functionName: "bid",
            params: {
                _teamId,
            },
            msgValue: Moralis.Units.ETH(amount)
        }
    }

    claim() {
        return {
            ...this.metadata(),
            functionName: "claim"
        }
    }


}
