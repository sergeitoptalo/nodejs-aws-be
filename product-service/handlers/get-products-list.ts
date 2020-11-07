import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { ResponseBuilder } from '../utils/response-builder';

export const getProductsList: APIGatewayProxyHandler = async () => {
  const client = new DatabaseClient().configure();
  await client.connect();

  try {
    const { rows: products } = await client.query(
      `select * from products left join stocks on products.id = stocks.product_id`
    );
    return {
      ...ResponseBuilder.success(),
      body: JSON.stringify(products),
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
