import { CampaignContractsState } from './../../interfaces/CampaignContractsState';
import { AddBetAction } from './../actions/UserBetsActions';
import { BetCheckoutActionTypes } from '../constants/BetCheckoutActionTypes';
import * as betCheckout from './BetCheckoutReducer';
import * as userBets from './UserBetsReducer';
import * as matches from './MatchesReducer';
import * as contracts from './CampaignContractsReducer';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { UserBetsState } from '../../interfaces/UserBetsState';
import { MatchesState } from '../../interfaces/MatchesState';
import { UserBetsActionTypes } from '../constants/UserBetsActionTypes';

export interface RootState {
    betCheckout: BetCheckoutState;
    userBets: UserBetsState;
    matches: MatchesState;
    contractsState: CampaignContractsState;
}

export default (
    state: RootState={
        betCheckout: betCheckout.initialState,
        userBets: userBets.initialState,
        matches: matches.initialState,
        contractsState: contracts.initialState
    },
    action: any
): RootState => {
    switch (action.type) {
        case BetCheckoutActionTypes.FINALIZE: {
            const addBetAction: AddBetAction = {
                type: UserBetsActionTypes.ADD_BET,
                bet: {
                    bet: state.betCheckout.bet,
                    transaction: action.transaction
                }
            };
            return {
                betCheckout: betCheckout.reducer(state.betCheckout, action),
                userBets: userBets.reducer(state.userBets, addBetAction),
                matches: matches.reducer(state.matches, action),
                contractsState: contracts.reducer(state.contractsState, action)
            }
        }
        default: {
            return {
                betCheckout: betCheckout.reducer(state.betCheckout, action),
                userBets: userBets.reducer(state.userBets, action),
                matches: matches.reducer(state.matches, action),
                contractsState: contracts.reducer(state.contractsState, action)
            }
        }
    }
}