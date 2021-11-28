import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { Match } from "../../interfaces/Match";

export const getTeamOdds = (bcs: BetCheckoutState, match: Match) => {
    if (match === null) {
        return null;
    }
    const allOdds = [
        match.tie,
        match.away,
        match.home
    ];
    let odds = allOdds.find(odds => odds.team.ID === bcs.bet.teamID);
    return odds === undefined ? null : odds;
};
