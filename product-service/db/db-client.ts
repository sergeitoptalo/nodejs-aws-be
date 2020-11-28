import { Client } from 'pg';
import { Product } from '../models/product.model';

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

  public async createProduct(newProductData: Product) {
    try {
      const { title, description, price, count } = newProductData;
      await this.client.query('BEGIN');

      const {
        rows: [{ id: newProductId, title: newProductTitle }],
      } = await this.client.query(
        `insert into products (title, description, price)
                values ($1, $2, $3)
                returning id, title;`,
        [title, description, price]
      );

      if (newProductId) {
        await this.client.query(
          `insert into stocks (product_id, product_count)
                  values ($1, $2);`,
          [newProductId, count]
        );
        await this.client.query('COMMIT');

        return newProductTitle;
      }
    } catch (error) {
      this.client.query('ROLLBACK');
      return error;
    }
  }
}
