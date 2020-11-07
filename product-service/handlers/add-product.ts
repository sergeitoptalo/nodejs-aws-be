import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { Product } from '../models/product.model';
import { ResponseBuilder } from '../utils/response-builder';

export const addProduct: APIGatewayProxyHandler = async (
  event,
  _context,
) => {
  console.log('EVENT', event);
  const client = new DatabaseClient().configure();
  await client.connect();

  try {
    const newProductData: Product = JSON.parse(event.body);

    if (newProductData) {
      const { title, description, price, count } = newProductData;
      const {
        rows: [{ id: newProductId }],
      } = await client.query(
        `insert into products (title, description, price)
          values (
            ${title ? `'${title}'` : null},
            ${description ? `'${description}'` : null},
            ${price})
          returning id;`
      );

      if (newProductId) {
        await client.query(
          `insert into stocks (product_id, product_count)
            values (${newProductId ? `'${newProductId}'` : null},
            ${count});`
        );

        return {
          ...ResponseBuilder.success(),
          body: JSON.stringify({ message: 'New product was added' }),
        };
      }
    }

    return {
      ...ResponseBuilder.clientError(),
      body: JSON.stringify({ message: 'Invalid data received from client' }),
    };
  } catch (error) {
    if (error.code === '23502') {
      return {
        ...ResponseBuilder.clientError(),
        body: JSON.stringify({
          message: 'Invalid data received from client',
        }),
      };
    }

    return {
      ...ResponseBuilder.serverError(),
      body: JSON.stringify({ message: 'Server error' }),
    };
  } finally {
    client.end();
  }
};
