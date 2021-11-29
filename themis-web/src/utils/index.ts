import { Match } from '../interfaces/Match';
import { convertOddsToString } from '../interfaces/TeamOdds';

// ttos is a timestap to string function
export const ttos = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString('en-US');

// otos is an odds to string function
export const otos = convertOddsToString;

export const encodeTeamId = (match: Match, teamId: string) => {
  let contractTeamId = -1;
  if (match.home.team.ID === teamId) {
      contractTeamId = 0;
  } else if (match.away.team.ID === teamId) {
      contractTeamId = 1;
  } else if (match.tie.team.ID === teamId) {
      contractTeamId = 2;
  }
  return contractTeamId;
}

export const unEncodeTeamId = (match: Match, encodedTeamId: number) => {
  switch (encodedTeamId) {
    case 0:
      return match.home.team.ID;
    case 1:
      return match.away.team.ID;
    case 2:
      return match.tie.team.ID;
    default:
      return "None"
  }
}

export const teamIdToTeamName = (teamId: string, match?: Match, ) => {
  if (match === undefined) {
    return "";
  }
  switch (teamId) {
    case match.home.team.ID: {
      return match.home.team.shortName;
    }
    case match.away.team.ID: {
      return match.away.team.shortName;
    }
    case match.tie.team.ID: {
      return match.tie.team.shortName;
    }
    default: {
      return "";
    }
  }
}