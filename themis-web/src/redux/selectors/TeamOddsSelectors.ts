import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { MatchesState } from "../../interfaces/MatchesState";
import { getMatch } from "./MatchSelectors";

export const getTeamOdds = (bcs: BetCheckoutState, ms: MatchesState) => {
    let match = getMatch(bcs, ms);
    if (match === null) {
        return null;
    }
    const allOdds = [
        match.tie,
        match.away,
        match.home
    ];
    let odds = allOdds.find(odds => odds.team.ID === bcs.teamID);
    return odds === undefined ? null : odds;
};
