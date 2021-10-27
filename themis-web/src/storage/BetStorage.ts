import { Bet } from "../interfaces/Bet";
import { BetCheckoutForm } from "../interfaces/BetCheckoutForm";

export const storeBet = (bet: Bet, betCheckoutForm: BetCheckoutForm) => {
    let matchId = JSON.stringify(bet);
    let betId = JSON.stringify(betCheckoutForm);
    let unparsedBets = localStorage.getItem(matchId);
    if (unparsedBets === null) {
        let bets = [betId];
        localStorage.setItem(matchId, JSON.stringify(bets));
    }
    else {
        let bets: string[] = JSON.parse(unparsedBets);
        bets.push(betId);
        localStorage.setItem(matchId, JSON.stringify(bets));
    }
};

export interface BetsForMatch {
    match: Bet;
    bets: BetCheckoutForm[];
}

export const getBets = (): BetsForMatch[] => {
    let allBets: BetsForMatch[] = [];
    for (var matchId in localStorage) {
        let match = matchId;
        let matchValue = localStorage.getItem(matchId);
        if (matchValue !== null) {
            let betStrings: string[] = JSON.parse(matchValue);
            let bets: BetCheckoutForm[] = betStrings.map((betStr) => JSON.parse(betStr)).filter(res => res !== null);
            console.log(JSON.parse(matchId));
            console.log(bets);
            allBets.push({match:JSON.parse(matchId), bets});
        }
    }
    console.log(allBets);
    return allBets;
}