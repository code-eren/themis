import { BetStatus } from './../../interfaces/Bet';
import { UserBetsState } from "../../interfaces/UserBetsState";
import { UserBetsAction } from "../actions/UserBetsActions";
import { UserBetsActionTypes } from "../constants/UserBetsActionTypes";
import {v4 as uuidv4} from 'uuid';

export const initialState: UserBetsState = {
    bets: [],
    error: ""
};

export const reducer = (state=initialState, action: UserBetsAction): UserBetsState => {
    switch (action.type) {
        case UserBetsActionTypes.DRAFT_BET: {
            const bets = state.bets.slice();
            bets.push({
                ID: uuidv4(),
                matchID: action.bet.matchID,
                teamID: action.bet.teamID,
                bidAmount: action.bet.bidAmount,
                timestamp: Date.now(),
                status: BetStatus.Drafted
            });
            return {
                ...state,
                bets,
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
