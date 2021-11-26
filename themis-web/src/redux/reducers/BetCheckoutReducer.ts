import { BetCheckoutActionTypes } from '../constants/BetCheckoutActionTypes';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { BetCheckoutAction } from '../actions/BetCheckoutActions';

export const initialState : BetCheckoutState = {
    matchID: "",
    teamID: "",
    bidAmount: "",
    error: "",
    loading: false,
    finished: false,
    transactionHash: ""
};

export const reducer = (state=initialState, action: BetCheckoutAction): BetCheckoutState => {
    switch (action.type) {
        case BetCheckoutActionTypes.SELECT_MATCH: {
            if (action.selectedMatchID === "") {
                return {
                    ...state,
                    error: "Please select a valid match.",
                };
            }
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
            return {
                ...state,
                loading: true
            }
        }
        case BetCheckoutActionTypes.CANCEL: {
            return initialState;
        }
        case BetCheckoutActionTypes.SET_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case BetCheckoutActionTypes.FINALIZE: {
            return {
                ...state,
                loading: false,
                finished: true,
                transactionHash: action.transactionHash
            };
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
        isValidBidAmount(bet.bidAmount) && bet.error === "";
};
