import 'reflect-metadata';
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager
} from 'typeorm';
import { Schedule } from './entity/schedule';
import { Campaign } from './entity/campaign';

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(name: string): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        name: 'default',
        type: 'sqlite',
        database: '../themis.db', // create a db in root of backend
        synchronize: true,
        logging: false,
        entities: [Schedule, Campaign]
      };
      connection = await createConnection(connectionOptions);
    }
    return connection;
  }
}
