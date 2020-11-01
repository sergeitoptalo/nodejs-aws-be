import { APIGatewayProxyHandler } from 'aws-lambda';
import { getProductsData } from '../data/products';
// import { getTechnologyNews } from '../utils/get-news';

const data = getProductsData();

export const getProductsList: APIGatewayProxyHandler = async () => {
  /**
   * Commented code demonstrates
   * the asynchronous data retrieval
   * inside lambda function
   */

  /* const latestTechnologyNews = await getTechnologyNews();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      products: data,
      news: latestTechnologyNews.data.articles,
    }),
  }; */

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};
