import { defaultContract } from './../reducers/CampaignContractsReducer';
import { CampaignContractProperties } from './../../interfaces/CampaignContract';
import { Match } from "../../interfaces/Match";

export interface MatchContract {
    match: Match;
    contract: CampaignContractProperties;
}

export const getMatchContracts = (matches: Match[], contracts: CampaignContractProperties[]): MatchContract[] => {
    return matches.map(match => {
        let contract = contracts.find(contract => contract.contractAddress === match.contractAddress);
        if (contract === undefined) {
            contract = defaultContract;
        }
        return {
            match,
            contract
        }
    });
}