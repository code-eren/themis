import { BetMade } from './../../interfaces/Bet';
import { UserBetsActionTypes } from "../constants/UserBetsActionTypes";
import { dispatch } from "../../storage/redux-store";

export interface AddBetAction {
    type: typeof UserBetsActionTypes.ADD_BET;
    bet: BetMade;

}

export const addBet = (bet: BetMade): AddBetAction => dispatch({
    type: UserBetsActionTypes.ADD_BET,
    bet
});

export interface RefreshAction {
    type: typeof UserBetsActionTypes.REFRESH;
}

export const refresh = (): RefreshAction => ({
    type: UserBetsActionTypes.REFRESH
});

export interface SetClaimableAction {
    type: typeof UserBetsActionTypes.SET_CLAIMABLE;
    txHash: string; // used to identify bet made
    claimable: boolean;
}

export const setClaimable = (txHash: string, claimable: boolean) => dispatch({
    type: UserBetsActionTypes.SET_CLAIMABLE,
    txHash,
    claimable
});

export type UserBetsAction =
    AddBetAction | RefreshAction | SetClaimableAction;