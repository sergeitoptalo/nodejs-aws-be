import { APIGatewayProxyResult } from "aws-lambda";
import { getProductsList } from "../../handlers/get-products-list";
import { getProductsData } from "../../data/products";

const productsData = getProductsData();

test("gets list of all products", () => {
  return (getProductsList(null, null, () => {}) as Promise<
    APIGatewayProxyResult
  >).then((data) => {
    expect(data).toEqual({
      statusCode: 200,
      body: JSON.stringify(productsData),
    });
  });
});
