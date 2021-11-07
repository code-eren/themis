import { TeamOdds } from "./TeamOdds";

export interface BetCheckoutForm {
    teamOddsSelected: TeamOdds | null;
    amountToBet: string | null;
}