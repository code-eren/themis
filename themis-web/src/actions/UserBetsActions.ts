import { UserBetsActionTypes } from '../constants/UserBetsActionTypes';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';
import { dispatch } from '../storage/redux-store';

export interface AddBetAction {
  type: typeof UserBetsActionTypes.ADD_BET;
  bet: BetCheckoutState;
}

export interface RefreshAction {
  type: typeof UserBetsActionTypes.REFRESH;
}

export type UserBetsAction = AddBetAction | RefreshAction;

export const addBet = (bet: BetCheckoutState): AddBetAction =>
  dispatch({
    type: UserBetsActionTypes.ADD_BET,
    bet
  });

export const refresh = (): RefreshAction => ({
  type: UserBetsActionTypes.REFRESH
});
