import { APIGatewayProxyHandler } from 'aws-lambda';
import { getProductsData } from '../data/products';
import { Product } from '../models/product.model';

const data: Array<Product> = getProductsData();

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const idFromParams = event.pathParameters.id;
  const product = data.find((item) => item.id === idFromParams);

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not found' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(product),
  };
};
