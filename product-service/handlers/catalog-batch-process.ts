import * as AWS from 'aws-sdk';
import { SQSHandler } from 'aws-lambda';
import DatabaseClient from '../db/db-client';

export const catalogBatchProcess: SQSHandler = async (event) => {
  const sns = new AWS.SNS({ region: 'eu-west-1' });
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

    const titles = await Promise.all(promises);

    // Generates 0 or 1 to test filter policy
    const distributeNotifications = Math.round(Math.random());

    sns
      .publish({
        Subject: 'New products were added',
        Message: `The following products were added today: ${titles.join(
          ', '
        )}`,
        TopicArn: process.env.SNS_ARN,
        MessageAttributes: {
          distribution: {
            DataType: 'String',
            StringValue: distributeNotifications
              ? 'use_secondary_email'
              : 'use_primary_email',
          },
        },
      })
      .send();
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
};
