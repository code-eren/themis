import {BetCheckoutActionTypes} from '../constants/BetCheckoutActionTypes';

export interface SelectMatchAction {
    type: typeof BetCheckoutActionTypes.SELECT_MATCH;
    selectedMatchID: string;
}

export interface SelectSideAction {
    type: typeof BetCheckoutActionTypes.SELECT_SIDE;
    selectedTeamID: string;
}

export interface EnterBidAmountAction {
    type: typeof BetCheckoutActionTypes.ENTER_BID;
    enteredBidAmount: string;
}

export interface CancelAction {
    type: typeof BetCheckoutActionTypes.CANCEL;
}

export interface SubmitAction {
    type: typeof BetCheckoutActionTypes.SUBMIT;
}

export type BetCheckoutAction = 
    SelectMatchAction | SelectSideAction | EnterBidAmountAction | CancelAction | SubmitAction;

export const selectMatch = (selectedMatchID: string): SelectMatchAction => ({
    type: BetCheckoutActionTypes.SELECT_MATCH,
    selectedMatchID,
});

export const selectSide = (selectedTeamID: string): SelectSideAction => ({
    type: BetCheckoutActionTypes.SELECT_SIDE,
    selectedTeamID,
});

export const enterBid = (enteredBidAmount: string): EnterBidAmountAction => ({
    type: BetCheckoutActionTypes.ENTER_BID,
    enteredBidAmount,
});

export const cancel = (): CancelAction => ({
    type: BetCheckoutActionTypes.CANCEL,
});

export const submit = (): SubmitAction => ({
    type: BetCheckoutActionTypes.SUBMIT,
})
