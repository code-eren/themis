import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Campaign } from './model/campaign';

export const createDB = () =>
  createConnection({
    type: 'sqlite',
    database: '../themis.db',
    entities: [Campaign],
    synchronize: true,
    logging: false
  });
