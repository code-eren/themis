import {BetCheckoutActionTypes} from '../constants/BetCheckoutActionTypes';
import { dispatch } from '../../storage/redux-store';

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

export interface SetLoadingAction {
    type: typeof BetCheckoutActionTypes.SET_LOADING;
    loading: boolean;
}

export interface FinalizeAction {
    type: typeof BetCheckoutActionTypes.FINALIZE;
    transactionHash: string;
}

export interface SetErrorAction {
    type: typeof BetCheckoutActionTypes.SET_ERROR;
    error: string;
}

export const selectMatch = (selectedMatchID: string): SelectMatchAction => dispatch({
    type: BetCheckoutActionTypes.SELECT_MATCH,
    selectedMatchID,
});

export const selectSide = (selectedTeamID: string): SelectSideAction => dispatch({
    type: BetCheckoutActionTypes.SELECT_SIDE,
    selectedTeamID,
});

export const enterBid = (enteredBidAmount: string): EnterBidAmountAction => dispatch({
    type: BetCheckoutActionTypes.ENTER_BID,
    enteredBidAmount,
});

export const cancel = (): CancelAction => dispatch({
    type: BetCheckoutActionTypes.CANCEL,
});

export const submit = (): SubmitAction => dispatch({
    type: BetCheckoutActionTypes.SUBMIT,
})

export const setLoading = (loading: boolean): SetLoadingAction => dispatch({
    type: BetCheckoutActionTypes.SET_LOADING,
    loading: loading,
});

export const setError = (error: string): SetErrorAction => dispatch({
    type: BetCheckoutActionTypes.SET_ERROR,
    error
});

export const finalize = (transactionHash: string): FinalizeAction => dispatch({
    type: BetCheckoutActionTypes.FINALIZE,
    transactionHash
});

export type BetCheckoutAction = 
    SelectMatchAction | SelectSideAction | EnterBidAmountAction | CancelAction | SubmitAction 
    | SetLoadingAction | SetErrorAction | FinalizeAction;