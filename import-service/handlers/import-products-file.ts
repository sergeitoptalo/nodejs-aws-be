import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
  const { IMPORT_SERVICE_BUCKET } = process.env;
  console.log(event);
  const s3: S3 = new AWS.S3({ region: 'eu-west-1' });
  const fileName = event.queryStringParameters.name;

  const signedUrlParams = {
    Bucket: IMPORT_SERVICE_BUCKET,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', signedUrlParams, (err, url) => {
      err
        ? reject(err)
        : resolve({
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: url,
          });
    });
  }) as Promise<APIGatewayProxyResult>;
};
