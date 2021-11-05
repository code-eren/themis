export interface Team {
    ID: string;
    fullName: string;
    shortName: string;
}

export interface TeamOdds {
    team: Team;
    odds: number;
}

export const convertOddsToString = (odds: number): string => {
    if (odds > 0) {
        return "+" + odds;
    }
    return odds.toString();
}