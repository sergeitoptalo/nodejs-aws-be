import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { ResponseBuilder } from '../utils/response-builder';

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const idFromParams = event.pathParameters.id;

  const client = new DatabaseClient().configure();
  await client.connect();

  try {
    const {
      rows: [product],
    } = await client.query(
      `select * from products left join stocks
      on products.id = stocks.product_id
      where id = '${idFromParams}';`
    );

    if (product) {
      return {
        ...ResponseBuilder.success(),
        body: JSON.stringify(product),
      };
    }
    return {
      ...ResponseBuilder.clientError(),
      body: JSON.stringify({ message: 'Not found' }),
    };
  } catch (error) {
    return {
      ...ResponseBuilder.serverError(),
      body: JSON.stringify({ message: error }),
    };
  } finally {
    await client.end();
  }
};
