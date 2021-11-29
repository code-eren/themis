import { OptionalCampaignContractProperties } from './../../interfaces/CampaignContract';
import { CampaignContractsActionTypes } from '../constants/CampaignContractsActionTypes';
import { dispatch } from '../../storage/redux-store';

export interface UpdateCampaignsAction {
    type: typeof CampaignContractsActionTypes.UPDATE_CAMPAIGNS;
    contractUpdates: OptionalCampaignContractProperties[];
}

export const update = (contractUpdates: OptionalCampaignContractProperties[]) => dispatch({
    type: CampaignContractsActionTypes.UPDATE_CAMPAIGNS,
    contractUpdates
});

export type CampaignContractsAction = UpdateCampaignsAction;