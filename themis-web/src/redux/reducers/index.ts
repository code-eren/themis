import { DraftBetAction } from './../actions/UserBetsActions';
import { BetCheckoutActionTypes } from './../constants/BetCheckoutActionTypes';
import { Action, combineReducers } from 'redux';
import * as betCheckout from './BetCheckoutReducer';
import * as userBets from './UserBetsReducer';
import * as matches from './MatchesReducer';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { UserBetsState } from '../../interfaces/UserBetsState';
import { MatchesState } from '../../interfaces/MatchesState';
import { UserBetsActionTypes } from '../constants/UserBetsActionTypes';

export interface State {
    betCheckout: BetCheckoutState;
    userBets: UserBetsState;
    matches: MatchesState;
}

export default (
    state: State={
        betCheckout: betCheckout.initialState,
        userBets: userBets.initialState,
        matches: matches.initialState
    },
    action: any
) => {
    switch (action.type) {
        case BetCheckoutActionTypes.SUBMIT: {
            const userBetsAction: DraftBetAction = {
                type: UserBetsActionTypes.DRAFT_BET,
                bet: { ...state.betCheckout }
            };
            return {
                betCheckout: betCheckout.reducer(state.betCheckout, action),
                userBets: userBets.reducer(state.userBets, userBetsAction),
                matches: state.matches
            }
        }
        default: {
            return {
                betCheckout: betCheckout.reducer(state.betCheckout, action),
                userBets: userBets.reducer(state.userBets, action),
                matches: matches.reducer(state.matches, action)
            }
        }
    }
}