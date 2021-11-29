import { Transaction } from './Bet';
export interface Event {
    address: string;
    transactionHash: string;
    returnValues: {
        bidder: string;
        amount: string;
        side: string;
    };
}

export interface Log {
    event: Event;
    metadata: {
        timestamp: number;
    };
}
