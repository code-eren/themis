import { combineReducers } from 'redux';
import betCheckout, * as fromBetCheckout from './BetCheckoutReducer';
import userBets from './UserBetsReducer';
import matches from './MatchesReducer';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';
import { UserBetsState } from '../interfaces/UserBetsState';
import { MatchesState } from '../interfaces/MatchesState';

export interface State {
  betCheckout: BetCheckoutState;
  userBets: UserBetsState;
  matches: MatchesState;
}

export default combineReducers<State>({
  betCheckout,
  userBets,
  matches
});
