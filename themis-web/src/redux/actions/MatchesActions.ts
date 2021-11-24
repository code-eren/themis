import { dispatch } from './../../storage/redux-store';
import { Match } from './../../interfaces/Match';
import { MatchActionType } from "../constants/MatchesActionTypes";

export interface SetMatchesAction {
    type: typeof MatchActionType.SET_MATCHES;
    matches: Match[];
}

export interface SetLoadingAction {
    type: typeof MatchActionType.SET_LOADING;
    loading: boolean;
}

export type MatchesAction =
    SetMatchesAction | SetLoadingAction;

// fetch all matches
export const setMatches = (matches: Match[]) => dispatch({
    type: MatchActionType.SET_MATCHES,
    matches
});

export const setLoading = (loading: boolean = true) => dispatch({
    type: MatchActionType.SET_LOADING,
    loading,
})
