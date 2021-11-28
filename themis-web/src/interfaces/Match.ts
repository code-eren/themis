import { TeamOdds } from './TeamOdds';

export interface Match {
  ID: string;
  away: TeamOdds;
  home: TeamOdds;
  tie: TeamOdds;
  startTimestamp: number;
  contractAddress: string;
  isKeeperRegistered: boolean;
}
