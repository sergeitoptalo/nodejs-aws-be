import { Request } from 'express';
import { AxiosRequestConfig } from 'axios';

export interface Controller {
  sendRequest: (config: AxiosRequestConfig) => Promise<unknown>;
  processRequest: (
    req: Request,
    serviceName: string,
    servicePath: Array<string>
  ) => Promise<unknown>;
}
