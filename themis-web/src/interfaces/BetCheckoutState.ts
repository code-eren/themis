import { Bet, Transaction } from './Bet';
export interface BetCheckoutState {
  bet: Bet;
  transaction?: Transaction;
  error: string;
  loading: boolean;
  finished: boolean;
}
