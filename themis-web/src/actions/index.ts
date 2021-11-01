import { ActionType } from '../constants/ActionTypes';

export const startBetSubmission = (matchID: string) => ({ type: ActionType.START_BET_SUBMISSION, matchID });
export const selectSide = (teamID: string) => ({ type: ActionType.SELECT_SIDE, teamID });
export const enterAmount = (amount: string) => ({ type: ActionType.ENTER_AMOUNT, amount });
export const submitBetSubmission = () => ({ type: ActionType.SUBMIT_BET_SUBMISSION });
export const cancelBetSumission = () => ({ type: ActionType.CANCEL_BET_SUBMISSION });
