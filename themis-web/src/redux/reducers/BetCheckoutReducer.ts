import { Bet } from '../../interfaces/Bet';
import { BetCheckoutActionTypes } from '../constants/BetCheckoutActionTypes';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { BetCheckoutAction } from '../actions/BetCheckoutActions';

export const initialState : BetCheckoutState = {
    bet: {
        matchID: "",
        teamID: "",
        bidAmount: "",
    },
    error: "",
    loading: false,
    finished: false
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
            const newBet: Bet = {
                ...state.bet,
                matchID: action.selectedMatchID
            }
            return {
                ...initialState,
                bet: newBet,
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
            const newBet: Bet = {
                ...state.bet,
                teamID: action.selectedTeamID
            }
            return {
                ...state,
                bet: newBet,
                error: "",
            };
        }
        case BetCheckoutActionTypes.ENTER_BID: {
            const newBet: Bet = {
                ...state.bet,
                bidAmount: action.enteredBidAmount
            }
            if (!isValidBidAmount(action.enteredBidAmount)) {
                return {
                    ...state,
                    bet: newBet,
                    error: "Please enter a valid bid amount."
                }
            }
            return {
                ...state,
                bet: newBet,
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

export const isValidBetCheckoutState = (betCheckoutState: BetCheckoutState): boolean => {
    return betCheckoutState.bet.teamID !== "" && betCheckoutState.bet.matchID !== "" &&
        isValidBidAmount(betCheckoutState.bet.bidAmount) && betCheckoutState.error === "";
};
