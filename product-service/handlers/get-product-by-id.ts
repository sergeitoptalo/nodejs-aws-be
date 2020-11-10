import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { ResponseBuilder } from '../utils/response-builder';

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const idFromParams = event.pathParameters.id;
  let client: DatabaseClient;

  try {
    client = new DatabaseClient().configure();
    await client.connect();

    const {
      rows: [product],
    } = await client.query(
      `select * from products left join stocks
      on products.id = stocks.product_id
      where id = $1;`,
      [idFromParams]
    );

    if (product) {
      return ResponseBuilder.success(product);
    }
    return ResponseBuilder.clientError({ message: 'Not found' });
  } catch (error) {
    return ResponseBuilder.serverError({ message: error });
  } finally {
    client.end();
  }
};
