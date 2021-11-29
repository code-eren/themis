import { BET_CHECKOUT, USER_BETS, MATCHES, CONTRACTS_STATE, LOGS_STATE } from './constants';

export const fetchStateFromCache = (key: string) => {
    switch (key) {
        case CONTRACTS_STATE:
        case BET_CHECKOUT: 
        case USER_BETS:
        case MATCHES:
        case LOGS_STATE: {
        const item = localStorage.getItem(key);
        if (item===null) {
            return undefined;
        }
        return JSON.parse(item);
        }
        default: {
            console.log("key not found in cache")
            return {};
        }
    }
};
