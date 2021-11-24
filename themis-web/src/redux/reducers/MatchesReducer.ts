import { MatchesAction } from "../actions/MatchesActions";
import { MatchActionType } from "../constants/MatchesActionTypes";
import { MatchesState } from "../../interfaces/MatchesState";

export const initialState : MatchesState = {
    matches: [],
    error: "",
    loading: false
};

export const reducer = (state:MatchesState=initialState, action: MatchesAction): MatchesState => {
    switch (action.type) {
        case MatchActionType.SET_MATCHES: {
            return {
                ...state,
                matches: action.matches
            };
        }
        case MatchActionType.SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        default: {
            return state;
        }
    }
};
