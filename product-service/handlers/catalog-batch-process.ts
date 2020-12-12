import { SQSHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';

export const catalogBatchProcess: SQSHandler = async (event) => {
  let client: DatabaseClient;

  try {
    const products = event.Records.map(({ body }) => JSON.parse(body));

    if (!products.length) {
      return;
    }

    client = new DatabaseClient().configure();
    await client.connect();

    const promises: Array<Promise<void>> = products.map((productData) =>
      client.createProduct(productData)
    );

    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
};
