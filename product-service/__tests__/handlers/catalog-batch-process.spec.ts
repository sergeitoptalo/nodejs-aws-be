import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { catalogBatchProcess } from '../../handlers/catalog-batch-process';

jest.mock('pg', () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn(() => ({
      rows: [{ id: '1', title: 'Test title' }],
    })),
    end: jest.fn(),
  };

  return { Client: jest.fn(() => mockClient) };
});

describe('Catalog batch process', () => {
  const envCopy = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...envCopy };
  });

  afterAll(() => {
    process.env = envCopy;
    AWSMock.restore('SNS');
    jest.clearAllMocks();
  });

  test('should send message with new products', async () => {
    const testSnsArn = 'TEST::ARN';

    process.env.SNS_ARN = testSnsArn;
    const snsMockCallback = jest.fn((_data, callback) => {
      callback();
    });

    const mockEvent: Partial<SQSEvent> = {
      Records: [
        {
          body: JSON.stringify({
            title: 'Test title',
            description: 'Test description',
            price: 1,
            count: 2,
          }),
        } as SQSRecord,
      ],
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('SNS', 'publish', snsMockCallback);

    await catalogBatchProcess(mockEvent as SQSEvent, null, null);

    expect(snsMockCallback.mock.calls.length).toBe(1);
    expect(snsMockCallback.mock.calls[0][0]).toEqual({
      Subject: 'New products were added',
      Message: `The following products were added today: Test title`,
      TopicArn: testSnsArn,
    });
  });
});
