import { PropertyStatus, CampaignContractProperties } from './../../interfaces/CampaignContract';
import { CampaignContractsAction } from '../actions/CampaignContractsActions';
import { CampaignContractsState } from '../../interfaces/CampaignContractsState';
import { CampaignContractsActionTypes } from '../constants/CampaignContractsActionTypes';
import { CONTRACTS_STATE } from '../../storage/constants';
import { fetchStateFromCache } from '../../storage/fetch-store';

const cachedState = fetchStateFromCache(CONTRACTS_STATE);

export const initialState : CampaignContractsState = cachedState === undefined ? {
    contractProps: []
} : cachedState;

const defaultPropertyStatus: PropertyStatus = {
    loading: false,
    error: ""
}

const defaultContract: CampaignContractProperties = {
    contractAddress: "",
    matchId: { status: defaultPropertyStatus },
    awayScore: { status: defaultPropertyStatus },
    homeScore: { status: defaultPropertyStatus },
    isFulfilled: { status: defaultPropertyStatus },
    chainlinkToken: { status: defaultPropertyStatus },
    homeOdds: { status: defaultPropertyStatus },
    awayOdds: { status: defaultPropertyStatus },
    drawOdds: { status: defaultPropertyStatus },
    homeTeamId: { status: defaultPropertyStatus },
    awayTeamId: { status: defaultPropertyStatus },
    winnerTeamId: { status: defaultPropertyStatus }
}

export const reducer = (state:CampaignContractsState=initialState, action: CampaignContractsAction): CampaignContractsState => {
    switch (action.type) {
        case CampaignContractsActionTypes.UPDATE_CAMPAIGNS: {
            if (state.contractProps === undefined) {
                return initialState;
            }
            let newContracts = state.contractProps.slice();
            let contractsToAdd = [];
            for (const updates of action.contractUpdates) {
                // check if we append or update
                let idx = newContracts.findIndex(contract => contract.contractAddress === updates.contractAddress)
                if (idx === -1) {
                    contractsToAdd.push({
                        ...defaultContract,
                        ...updates
                    });
                } else {
                    newContracts[idx] = {
                        ...newContracts[idx],
                        ...updates
                    };
                }
            }
            newContracts = newContracts.concat(contractsToAdd);
            return {
                ...state,
                contractProps: newContracts
            };
        }
        default: {
            return state;
        }
    }
};
