import { combineReducers } from 'redux';
import { DraftedBet } from '../interfaces/BetSubmisison';
import { betSubmission } from '../reducers/betSubmisison';

export interface AppState {
    betSubmission: DraftedBet;
}

export default combineReducers({
    betSubmission,
});
