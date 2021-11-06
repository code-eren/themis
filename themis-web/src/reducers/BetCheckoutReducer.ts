import { BetCheckoutActionTypes } from '../constants/BetCheckoutActionTypes';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';
import { BetCheckoutAction } from '../actions/BetCheckoutActions';

export const initialState : BetCheckoutState = {
    matchID: "",
    teamID: "",
    bidAmount: "",
    error: "",
    loading: false
};

const BetCheckoutReducer = (state=initialState, action: BetCheckoutAction): BetCheckoutState => {
    switch (action.type) {
        case BetCheckoutActionTypes.SELECT_MATCH: {
            console.log("error:")
            console.log(state.error);
            if (action.selectedMatchID === "") {
                return {
                    ...state,
                    error: "Please select a valid match.",
                };
            }
            console.log("match selected")
            return {
                ...initialState,
                matchID: action.selectedMatchID,
                error: "",
            };
        }
        case BetCheckoutActionTypes.SELECT_SIDE: {
            if (action.selectedTeamID === "") {
                return {
                    ...state,
                    error: "Please select a valid side."
                };
            }
            return {
                ...state,
                teamID: action.selectedTeamID,
                error: "",
            };
        }
        case BetCheckoutActionTypes.ENTER_BID: {
            if (!isValidBidAmount(action.enteredBidAmount)) {
                return {
                    ...state,
                    bidAmount: action.enteredBidAmount,
                    error: "Please enter a valid bid amount."
                }
            }
            return {
                ...state,
                bidAmount: action.enteredBidAmount,
                error: "",
            };
        }
        case BetCheckoutActionTypes.SUBMIT: {
            if (!isValidBetCheckoutState(state)) {
                return state;
            }
            return initialState;
        }
        case BetCheckoutActionTypes.CANCEL: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

const isValidBidAmount = (bidAmount: string): boolean => {
    if (isNaN(parseFloat(bidAmount))) {
        return false;
    }
    return true;
};

export const isValidBetCheckoutState = (bet: BetCheckoutState): boolean => {
    return bet.teamID !== "" && bet.matchID !== "" &&
        isValidBidAmount(bet.bidAmount) && bet.error === ""
};

export default BetCheckoutReducer;