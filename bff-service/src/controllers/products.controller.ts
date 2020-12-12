import { Request } from 'express';
import { Method } from 'axios';

import BaseController from './base.controller';
import { Controller } from '../models/base-controller.model';
import cache from '../utils/cache';

class ProductController extends BaseController implements Controller {
  public processRequest(
    req: Request,
    serviceName: string,
    servicePath: Array<string>
  ) {
    const cacheKey = req.cookies?.use_cache;

    const config = {
      url: `${process.env[serviceName]}/${servicePath.join('/')}`,
      method: req.method as Method,
      data: Object.keys(req.body).length ? req.body : null,
    };

    return new Promise((resolve, reject) => {
      if (cacheKey && !cache.expired(cacheKey)) {
        console.log('FROM CACHE');

        resolve({ data: cache.get(cacheKey) });
      } else {
        console.log('FROM SERVICE');

        this.shouldCache(req)
          ? this.sendRequest(config).then(({ data }) => {
              cache.set(cacheKey, data);
              resolve({ data });
            })
          : resolve(this.sendRequest(config));
      }
    });
  }

  public shouldCache(req: Request): boolean {
    return (
      req.method.toLowerCase() === 'get' &&
      req.url === '/product-service/products'
    );
  }
}

export default new ProductController();
