import express, { Express } from 'express';
import cartRouter from './Router/cart.router';
import productRouter from './Router/product.router';
import { checkUserId } from './middleware/authentication.middleware';

export const app: Express = express();
const port = 8000;

app.use('/api/profile/cart', checkUserId, cartRouter);
app.use('/api/products', checkUserId,  productRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

