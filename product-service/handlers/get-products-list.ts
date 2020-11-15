import { APIGatewayProxyHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';
import { ResponseBuilder } from '../utils/response-builder';

export const getProductsList: APIGatewayProxyHandler = async () => {
  let client: DatabaseClient;

  try {
    client = new DatabaseClient().configure();
    await client.connect();

    const { rows: products } = await client.query(
      `select * from products left join stocks on products.id = stocks.product_id`
    );

    return ResponseBuilder.success(products);
  } catch (error) {
    return ResponseBuilder.serverError({ message: error });
  } finally {
    client.end();
  }
};
