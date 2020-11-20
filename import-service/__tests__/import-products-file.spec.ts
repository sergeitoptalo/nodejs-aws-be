import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { importProductsFile } from '../handlers/import-products-file';

describe('Import file service', () => {
  const envCopy = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...envCopy };
  });

  afterAll(() => {
    process.env = envCopy;
    AWSMock.restore('S3');
  });

  test('should return success response with signed url in the body', async () => {
    process.env.IMPORT_SERVICE_BUCKET = 'test-bucket';

    const testSighedUrl = 'https://test-signed-url';
    const event: Partial<APIGatewayProxyEvent> = {
      queryStringParameters: {
        name: 'test-file.csv',
      },
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
      callback(null, testSighedUrl);
    });

    const result = await importProductsFile(
      event as APIGatewayProxyEvent,
      null,
      null
    );

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: testSighedUrl,
    });
  });
});
