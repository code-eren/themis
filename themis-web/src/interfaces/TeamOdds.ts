export interface TeamOdds {
    team: string;
    odds: number;
}

export const convertOddsToString = (odds: number): string => {
    if (odds > 0) {
        return "+" + odds;
    }
    return odds.toString();
}