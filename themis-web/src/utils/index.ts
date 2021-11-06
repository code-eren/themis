import { convertOddsToString } from "../interfaces/TeamOdds";

// ttos is a timestap to string function
export const ttos = (timestamp: number): string => new Date(timestamp).toLocaleDateString("en-US");

// otos is an odds to string function
export const otos = convertOddsToString;