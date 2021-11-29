// drafting a bet is when you first submit a bet from the checkout
// creating a bet is when the bet is created on-chain 
// (should be called after bid transaction completes)
// a bet is fulfilled once the final score for a match is known
// and the user is able to retrieve their winnings
// refresh is called during notifications from campaign-manager

export interface Bet {
  matchID: string;
  teamID: string;
  bidAmount: string;
}

export interface Transaction {
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  effectiveGasPrice: string;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  events: any;
}

export interface BetMade {
  // details from transaction
  transaction: Transaction;

  // details from bet checkout
  bet: Bet;

  // null if not claimable
  // true if claimable
  // false if already claimed
  claimable?: boolean;
}