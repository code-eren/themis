import "reflect-metadata";
import { createConnection } from "typeorm";
import { Campaign } from './model/campaign';

export const getConnection = () => {
    return createConnection({
        type: "sqlite",
        database: ":memory",
        entities: [
            Campaign
        ],
    });
}