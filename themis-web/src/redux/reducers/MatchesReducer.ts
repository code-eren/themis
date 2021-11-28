import { MatchesAction } from "../actions/MatchesActions";
import { MatchActionType } from "../constants/MatchesActionTypes";
import { MatchesState } from "../../interfaces/MatchesState";
import {MATCHES} from '../../storage/constants';
import {fetchStateFromCache} from '../../storage/fetch-store';

const cachedState = fetchStateFromCache(MATCHES);
export const initialState : MatchesState = cachedState === undefined ? {
    matches: [],
    error: "",
    loading: false
} : cachedState;

export const reducer = (state:MatchesState=initialState, action: MatchesAction): MatchesState => {
    switch (action.type) {
        case MatchActionType.SET_MATCHES: {
            return {
                ...state,
                matches: action.matches,
                error: ""
            };
        }
        case MatchActionType.SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        case MatchActionType.SET_ERROR: {
            return {
                ...state,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
};
