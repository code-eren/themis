export interface DraftedBet {
    matchID: string;
    selectedTeamID: string;
    bidAmount: string;
    error: string;
};

export interface SubmittedBet {
    betID: string;
    matchID: string;
    selectedTeamID: string;
    bidAmount: string;
}