import express from 'express';
import dotenv from 'dotenv';
import setCacheAttribute from './middlewares/set-cache-attribite';
import routes from './routes/routes';
import cache from './utils/cache';

dotenv.config();

cache.addService('products').setExpiration('products', 120000);

const app = express();
app.use(express.json());
app.use(setCacheAttribute());

app.use(routes);

export default app;
