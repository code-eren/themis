import { UserBetsState } from "../interfaces/UserBetsState";
import { UserBetsAction } from "../actions/UserBetsActions";
import { UserBetsActionTypes } from "../constants/UserBetsActionTypes";

const initialState: UserBetsState = {
    bets: [],
    error: ""
};

const UserBetsReducer = (state=initialState, action: UserBetsAction): UserBetsState => {
    switch (action.type) {
        case UserBetsActionTypes.ADD_BET: {
            state.bets.push({
                ID: "b" + state.bets.length.toString(),
                matchID: action.bet.matchID,
                teamID: action.bet.teamID,
                bidAmount: action.bet.bidAmount,
                timestamp: Date.now()
            });
            return state;
        }
        case UserBetsActionTypes.REFRESH: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default UserBetsReducer;