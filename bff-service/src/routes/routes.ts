import express from 'express';
import { Method } from 'axios';
import productController from '../controllers/products.controller';
import cartController from '../controllers/cart.controller';
import { Controller } from '../models/base-controller.model';

const serviceControllers: { [serviceName: string]: Controller } = {
  'product-service': productController,
  'cart-service': cartController,
};

const routes = express.Router();

routes.all('/*', (req, res) => {
  const [serviceName, ...servicePath] = req.url.split('/').filter(Boolean);

  if (process.env[serviceName]) {
    const config = {
      url: `${process.env[serviceName]}/${servicePath.join('/')}`,
      method: req.method as Method,
      data: Object.keys(req.body).length ? req.body : null,
    };

    serviceControllers[serviceName]
      .processRequest(req, serviceName, servicePath)
      .then(({ data }) => {
        res
          .status(200)
          .set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers':
              'Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          })
          .send(data);
      })
      .catch((error) => {
        res
          .set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          .status(500)
          .send(error);
      });
  } else {
    res
      .set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
      .status(502)
      .send({ message: 'Cannot process request' });
  }
});

export default routes;
