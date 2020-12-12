import { Request } from 'express';
import { Method } from 'axios';

import BaseController from './base.controller';
import { Controller } from '../models/base-controller.model';

class CartController extends BaseController implements Controller {
  public processRequest(
    req: Request,
    serviceName: string,
    servicePath: Array<string>
  ) {
    const config = {
      url: `${process.env[serviceName]}/${servicePath.join('/')}`,
      method: req.method as Method,
      data: Object.keys(req.body).length ? req.body : null,
    };

    return this.sendRequest(config);
  }
}

export default new CartController();
