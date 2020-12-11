import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

export default class BaseController {
  sendRequest(config: AxiosRequestConfig) {
    return axios(config);
  }
}
