import { MatchActionType } from "../constants/MatchesActionTypes";

export interface FetchMatchesAction {
    type: typeof MatchActionType.FETCH_MATCHES;
}

export type MatchesAction =
    FetchMatchesAction;

// fetch all matches
export const fetchMatches = () => ({
    type: MatchActionType.FETCH_MATCHES,
});
