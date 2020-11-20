import { APIGatewayProxyResult } from 'aws-lambda';
import { getProductsList } from '../../handlers/get-products-list';

const mockProductsData = [
  {
    count: 7,
    description:
      '20PCS/Lot 7X7mm 7*7mm 6Pin Push Tactile Power Micro Switch Self lock',
    id: '3',
    price: 1.25,
    title: 'On/Off button',
  },
  {
    count: 12,
    description:
      'Multicolor 4pin 5mm RGB Led Diode Light Lamp Tricolor Round Common Anode Red Green Blue',
    id: '4',
    price: 0.83,
    title: 'LED F5 Light Emitting Diode',
  },
];

jest.mock('pg', () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn(() => ({
      rows: mockProductsData,
    })),
    end: jest.fn(),
  };

  return { Client: jest.fn(() => mockClient) };
});

describe('Get products list', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('gets list of all products', () => {
    return (getProductsList(null, null, () => {}) as Promise<
      APIGatewayProxyResult
    >).then((data) => {
      expect(data).toEqual({
        statusCode: 200,
        body: JSON.stringify(mockProductsData),
        headers: {
          ['Access-Control-Allow-Origin']: '*',
          ['Content-Type']: 'application/json',
        },
      });
    });
  });
});
