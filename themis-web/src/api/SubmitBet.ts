import { setLoading } from '../redux/actions/BetCheckoutActions';
import { addBet } from '../redux/actions/UserBetsActions';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';

export const submitBet = (betCheckoutState: BetCheckoutState) => {
  setLoading(true);
  setTimeout(() => {
    addBet(betCheckoutState);
    setLoading(false);
  }, 2000);
};
