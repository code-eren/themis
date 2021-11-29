import { BetMade } from './Bet';

export interface UserBetsState {
  betsMade: BetMade[];
  error: string;
}
