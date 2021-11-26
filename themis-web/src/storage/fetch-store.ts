import { BET_CHECKOUT, USER_BETS} from './constants';

export const fetchStateFromCache = (key: string) => {
    switch (key) {
        case BET_CHECKOUT: 
        case USER_BETS: {
        return JSON.parse(localStorage.getItem(key) ?? "{}");
        }
        default: {
        return {};
        }
    }
};
