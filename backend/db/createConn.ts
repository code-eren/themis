import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Schedule } from './entity/schedule';
import { Campaign } from './entity/campaign';

export const createConnectionToDB = () =>
  createConnection({
    type: 'sqlite',
    database: '../themis.db', // create a db in root of backend
    entities: [Schedule, Campaign],
    synchronize: true,
    logging: false
  });
