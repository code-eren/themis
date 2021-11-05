import { MatchesAction } from "../actions/MatchedsActions";
import { MatchActionType } from "../constants/MatchesActionTypes";
import { MatchesState } from "../interfaces/MatchesState";

const initialState : MatchesState = {
    matches: [
        {
            ID: "m1",
            away: {
                team: {
                    ID: "t1",
                    shortName: "BRA",
                    fullName: "Brazil"
                },
                odds: -300
            },
            home: {
                team: {
                    ID: "t2",
                    shortName: "CHI",
                    fullName: "China",
                },
                odds: +200
            },
            tie: {
                team: {
                    ID: "t3",
                    shortName: "TIE",
                    fullName: "Tie"
                },
                odds: +100
            },
            startTimestamp: 1636083147162,
        }
    ],
    error: "",
};

const MatchesStateReducer = (state:MatchesState=initialState, action: MatchesAction): MatchesState => {
    switch (action.type) {
        case MatchActionType.FETCH_MATCHES: {
            return state;
        }
    }
};

export default MatchesStateReducer;