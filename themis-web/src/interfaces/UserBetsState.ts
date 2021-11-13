import { Bet } from './Bet';

export interface UserBetsState {
  bets: Bet[];
  error: string;
}
