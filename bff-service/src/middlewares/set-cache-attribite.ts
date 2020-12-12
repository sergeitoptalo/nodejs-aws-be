import express, { NextFunction } from 'express';

const setCacheAttribute = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    req.url === '/product-service/products' &&
    req.method.toLowerCase() === 'get'
  ) {
    req.cookies = { ...(req.cookies || {}), use_cache: 'products' };
  }

  next();
};

export default setCacheAttribute;
