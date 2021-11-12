import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { MatchesState } from "../../interfaces/MatchesState";

export const getMatch = (bcs: BetCheckoutState, ms: MatchesState) => {
    let match = ms.matches.find(m => m.ID === bcs.matchID);
    return match === undefined ? null : match;
};
