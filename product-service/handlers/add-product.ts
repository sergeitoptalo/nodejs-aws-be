import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { Product } from '../models/product.model';
import { ResponseBuilder } from '../utils/response-builder';

export const addProduct: APIGatewayProxyHandler = async (event, _context) => {
  console.log('EVENT', event);
  let client: DatabaseClient;

  try {
    client = new DatabaseClient().configure();
    await client.connect();

    const newProductData: Product = JSON.parse(event.body);

    if (newProductData) {
      const { title, description, price, count } = newProductData;
      const {
        rows: [{ id: newProductId }],
      } = await client.query(
        `insert into products (title, description, price)
          values ($1, $2, $3)
          returning id;`,
        [title, description, price]
      );

      if (newProductId) {
        await client.query(
          `insert into stocks (product_id, product_count)
            values ($1, $2);`,
          [newProductId, count]
        );

        return ResponseBuilder.success('New product was added');
      }

      return ResponseBuilder.clientError('Invalid data received from client');
    }
  } catch (error) {
    if (error.code === '23502') {
      return ResponseBuilder.clientError('Invalid data received from client');
    }

    return ResponseBuilder.serverError('Server error');
  } finally {
    client.end();
  }
};
