import { BetStatus } from './../../interfaces/Bet';
import { UserBetsActionTypes } from "../constants/UserBetsActionTypes";
import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { dispatch } from "../../storage/redux-store";

export interface DraftBetAction {
    type: typeof UserBetsActionTypes.DRAFT_BET;
    bet: BetCheckoutState;
}

export interface SetBetStatusAction {
    type: typeof UserBetsActionTypes.SET_BET_STATUS,
    betID: string;
    betStatus: BetStatus;
}

export interface RefreshAction {
    type: typeof UserBetsActionTypes.REFRESH;
}

export type UserBetsAction =
    DraftBetAction | SetBetStatusAction | RefreshAction;

export const draftBet = (bet: BetCheckoutState): DraftBetAction => dispatch({
    type: UserBetsActionTypes.DRAFT_BET,
    bet
});

export const setBetStatus = (betID: string, betStatus: BetStatus) => dispatch({
    type: UserBetsActionTypes.SET_BET_STATUS,
    betID,
    betStatus
});

export const refresh = (): RefreshAction => ({
    type: UserBetsActionTypes.REFRESH
});