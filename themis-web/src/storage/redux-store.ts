import { RootState } from '../redux/reducers/index';
import { createStore, applyMiddleware, Middleware } from 'redux';
import reducers from '../redux/reducers';
import { BET_CHECKOUT, MATCHES, USER_BETS, CONTRACTS_STATE } from './constants';

const storeStateInCache: Middleware<{}, RootState> = storeApi => next => action => {
  const afterDispatch = next(action);
  // cache state after dispatch (but only betCheckout and userBets)
  const state = storeApi.getState();
  localStorage.setItem(BET_CHECKOUT, JSON.stringify(state.betCheckout));
  localStorage.setItem(USER_BETS, JSON.stringify(state.userBets));
  localStorage.setItem(MATCHES, JSON.stringify(state.matches));
  localStorage.setItem(CONTRACTS_STATE, JSON.stringify(state.contractsState));
  return afterDispatch;
};

export const store = createStore(
  reducers,
  applyMiddleware(storeStateInCache)
);
export const dispatch = store.dispatch;
