import { DraftSubmissionActionType } from '../constants/ActionTypes';
import { DraftedBet, DraftSubmissionState } from '../interfaces/BetSubmisison';
import { StartBetSubmissionAction, SelectSideAction, EnterBidAmountAction, CancelBetSubmissionAction, SubmitBetSubmissionAction } from '../actions/index';

export const initialState : DraftedBet = {
    selectedmatchID: "",
    selectedTeamID: "",
    enteredBidAmount: "",
    error: "",
    prevState: DraftSubmissionState.EMPTY,
};

type DraftBetSubmissionAction =
    StartBetSubmissionAction |
    SelectSideAction |
    EnterBidAmountAction |
    CancelBetSubmissionAction |
    SubmitBetSubmissionAction

export function betSubmission(state=initialState, action: DraftBetSubmissionAction): DraftedBet {
    switch (action.type) {
        case DraftSubmissionActionType.START_BET_SUBMISSION: {
            if (action.selectedMatchID === "") {
                return {
                    ...state,
                    error: "Please select a valid match.",
                };
            }
            return {
                ...initialState,
                prevState: DraftSubmissionState.START,
                selectedTeamID: action.selectedMatchID,
                error: "",
            };
        }
        case DraftSubmissionActionType.SELECT_SIDE: {
            const validPrevStates = [DraftSubmissionState.START, DraftSubmissionState.SELECT_SIDE, DraftSubmissionState.ENTER_AMOUNT];
            if (!validPrevStates.includes(state.prevState)) {
                return {
                    ...state,
                    error: "Please restart the checkout process.",
                };
            } else if (action.selectedTeamID === "") {
                return {
                    ...state,
                    error: "Please select a valid side.",
                };
            }
            return {
                ...state,
                prevState: DraftSubmissionState.SELECT_SIDE,
                selectedTeamID: action.selectedTeamID,
                error: "",
            };
        }
        case DraftSubmissionActionType.ENTER_BID_AMOUNT: {
            const validPrevStates = [DraftSubmissionState.SELECT_SIDE, DraftSubmissionState.ENTER_AMOUNT];
            if (!validPrevStates.includes(state.prevState)) {
                return {
                    ...state,
                    error: "Please restart the checkout process.",
                };
            } else if (action.enteredBidAmount === "") {
                return {
                    ...state,
                    error: "Please enter a valid bid amount.",
                };
            }
            return {
                ...state,
                prevState: DraftSubmissionState.ENTER_AMOUNT,
                enteredBidAmount: action.enteredBidAmount,
                error: "",
            };
        }
        case DraftSubmissionActionType.SUBMIT_BET_SUBMISSION: {
            const validPrevStates = [DraftSubmissionState.ENTER_AMOUNT];
            if (!validPrevStates.includes(state.prevState)) {
                return {
                    ...state,
                    error: "Please restart the checkout process."
                };
            }
            // submitDraft
            return initialState;
        }
        case DraftSubmissionActionType.CANCEL_BET_SUBMISSION: {
            return initialState;
        }
    }
}
