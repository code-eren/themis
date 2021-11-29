import { UserBetsState } from "../../interfaces/UserBetsState";
import { UserBetsAction } from "../actions/UserBetsActions";
import { UserBetsActionTypes } from "../constants/UserBetsActionTypes";
import {USER_BETS} from '../../storage/constants';
import {fetchStateFromCache} from '../../storage/fetch-store';

const cachedState = fetchStateFromCache(USER_BETS);

export const initialState: UserBetsState = cachedState === undefined ? {
    betsMade: [],
    error: ""
} : cachedState;

export const reducer = (state=initialState, action: UserBetsAction): UserBetsState => {
    switch (action.type) {
        case UserBetsActionTypes.ADD_BET: {
            if (state.betsMade === undefined) {
                state.betsMade = [];
            }
            console.log(action.bet);
            // de-dupe
            if (state.betsMade.filter((bet)=> bet.transaction.transactionHash === action.bet.transaction.transactionHash).length > 0) {
                console.log("found dupe")
                return state;
            }
            const betsMade = state.betsMade.slice();
            betsMade.push(action.bet);
            return {
                ...state,
                betsMade
            };
        }
        case UserBetsActionTypes.SET_CLAIMABLE: {
            const betsMade = state.betsMade.slice();
            const betMadeIdx = betsMade.findIndex(betMade => betMade.transaction.transactionHash === action.txHash);
            if (betMadeIdx !== -1) {
                betsMade[betMadeIdx].claimable = action.claimable;
            }
            return {
                ...state,
                betsMade
            };
        }
        case UserBetsActionTypes.REFRESH: {
            return state;
        }
        default: {
            return state;
        }
    }
}
