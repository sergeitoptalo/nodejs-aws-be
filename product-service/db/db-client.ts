import { Client } from 'pg';

interface DatabaseOptions {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
  connectionTimeoutMillis: number;
}

export default class DatabaseClient {
  private dbOptions: DatabaseOptions;
  private client: Client;

  public configure() {
    const {
      DB_HOST,
      DB_PORT,
      DATABASE,
      DB_USERNAME,
      DB_PASSWORD,
    } = process.env;

    this.dbOptions = {
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DATABASE,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 5000,
    };

    return this;
  }

  public async connect(): Promise<void> {
    this.client = new Client(this.dbOptions);
    return await this.client.connect();
  }

  public async query(params: string, values?: Array<unknown>) {
    return await this.client.query(params, values);
  }

  public async end() {
    return await this.client.end();
  }
}
