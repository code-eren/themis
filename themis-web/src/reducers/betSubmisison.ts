import { ActionType } from '../constants/ActionTypes';
import { DraftedBet, SubmittedBet } from '../interfaces/BetSubmisison';
import { Match } from '../interfaces/Match';

const initialState : DraftedBet = {
    matchID: "",
    selectedTeamID: "",
    bidAmount: "",
    error: "",
};

interface Action {
    type: ActionType;
    matchID?: string;
    teamID?: string;
    amount?: string;
}

export default function betSubmission(state=initialState, action: Action): DraftedBet {
    switch (action.type) {
        case ActionType.START_BET_SUBMISSION:
            if (action.matchID === undefined || action.matchID === "") {
                return {
                    ...state,
                    error: "Please bet on a valid match.",
                };
            }
            return { ...state, error: "" };
        case ActionType.SELECT_SIDE:
            if (action.teamID === undefined || action.teamID === "") {
                return {
                    ...state,
                    error: "Please select a valid team."
                }
            }
            return { ...state, selectedTeamID: action.teamID, error: "" };
        case ActionType.ENTER_AMOUNT:
            if (action.amount === undefined || action.amount === "") {
                return { ...state, error: "Please enter an amount." };
            } else if (isNaN(parseFloat(action.amount))) {
                return { ...state, error: "Please enter a numeric quantity." };
            } // check if user has enough
            return {
                ...state,
                bidAmount: action.amount ?? state.bidAmount,
            }
        case ActionType.SUBMIT_BET_SUBMISSION:

        case ActionType.CANCEL_BET_SUBMISSION:
        default:
            return initialState;
    }
}