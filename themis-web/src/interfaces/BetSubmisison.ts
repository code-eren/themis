export enum DraftSubmissionState {
    START = 1,
    SELECT_SIDE = 2,
    ENTER_AMOUNT = 3,
    EMPTY = 4,
}

export interface DraftedBet {
    prevState: DraftSubmissionState;
    selectedmatchID: string;
    selectedTeamID: string;
    enteredBidAmount: string;
    error: string;
};

export interface SubmittedBet {
    betID: string;
    matchID: string;
    selectedTeamID: string;
    bidAmount: string;
}