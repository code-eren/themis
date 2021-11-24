// drafting a bet is when you first submit a bet from the checkout
// creating a bet is when the bet is created on-chain 
// (should be called after bid transaction completes)
// a bet is fulfilled once the final score for a match is known
// and the user is able to retrieve their winnings
// refresh is called during notifications from campaign-manager
export enum BetStatus {
  Drafted = 0,
  Created = 1,
  Exercisable = 2
}

export interface Bet {
  ID: string;
  matchID: string;
  teamID: string;
  bidAmount: string;
  timestamp: number;
  status: BetStatus;
}
