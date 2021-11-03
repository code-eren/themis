import {DraftSubmissionActionType} from '../constants/ActionTypes';

export interface StartBetSubmissionAction {
    type: typeof DraftSubmissionActionType.START_BET_SUBMISSION;
    selectedMatchID: string;
}

export interface SelectSideAction {
    type: typeof DraftSubmissionActionType.SELECT_SIDE;
    selectedTeamID: string;
}

export interface EnterBidAmountAction {
    type: typeof DraftSubmissionActionType.ENTER_BID_AMOUNT;
    enteredBidAmount: string;
}

export interface CancelBetSubmissionAction {
    type: typeof DraftSubmissionActionType.CANCEL_BET_SUBMISSION;
}

export interface SubmitBetSubmissionAction {
    type: typeof DraftSubmissionActionType.SUBMIT_BET_SUBMISSION;
}

export const startBetSubmission = (selectedMatchID: string): StartBetSubmissionAction => ({
    type: DraftSubmissionActionType.START_BET_SUBMISSION,
    selectedMatchID,
});

export const selectSide = (selectedTeamID: string): SelectSideAction => ({
    type: DraftSubmissionActionType.SELECT_SIDE,
    selectedTeamID,
});

export const enterBidAmount = (enteredBidAmount: string): EnterBidAmountAction => ({
    type: DraftSubmissionActionType.ENTER_BID_AMOUNT,
    enteredBidAmount,
});

export const cancelBetSubmission = (): CancelBetSubmissionAction => ({
    type: DraftSubmissionActionType.CANCEL_BET_SUBMISSION,
});

export const submitBetSubmission = (): SubmitBetSubmissionAction => ({
    type: DraftSubmissionActionType.SUBMIT_BET_SUBMISSION,
})