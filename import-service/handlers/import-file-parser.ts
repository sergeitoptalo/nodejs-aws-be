import { S3Event } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import * as csv from 'csv-parser';
import { Stream } from 'stream';

export const importFileParser = (event: S3Event) => {
  const { IMPORT_SERVICE_BUCKET } = process.env;
  const s3: S3 = new AWS.S3({ region: 'eu-west-1' });

  event.Records.forEach((record) => {
    const objectKey: string = record.s3.object.key;
    const s3Stream: Stream = s3
      .getObject({
        Bucket: IMPORT_SERVICE_BUCKET,
        Key: objectKey,
      })
      .createReadStream();

    s3Stream
      .pipe(csv())
      .on('data', (data) => {
        console.log(data);
      })
      .on('end', async () => {
        await s3
          .copyObject({
            Bucket: IMPORT_SERVICE_BUCKET,
            CopySource: `${IMPORT_SERVICE_BUCKET}/${objectKey}`,
            Key: objectKey.replace('uploaded', 'parsed'),
          })
          .promise();

        await s3
          .deleteObject({
            Bucket: IMPORT_SERVICE_BUCKET,
            Key: objectKey,
          })
          .promise();
      })
      .on('error', (error) => {
        console.log(error);
      });
  });
};
