import {
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerHandler,
} from 'aws-lambda';

const generatePolicy = (principalId, effect = 'Deny', resource) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

export const basicAuthorizer: APIGatewayAuthorizerHandler = (
  event: APIGatewayAuthorizerEvent,
  _context,
  callback
) => {
  console.log('Authorizer event', event);

  if (event['type'] !== 'TOKEN') {
    return callback('Unauthorized');
  }

  try {
    const [, tokenFromRequest] = event.authorizationToken.split(' ');
    const [username, password] = Buffer.from(tokenFromRequest, 'base64')
      .toString('utf-8')
      .split(':');

    const effect =
      process.env[username] && process.env[username] === password
        ? 'Allow'
        : 'Deny';

    const policy = generatePolicy(tokenFromRequest, effect, event.methodArn);

    callback(null, policy);
  } catch (error) {
    callback(`Unauthorized: ${error.message}`);
  }
};
