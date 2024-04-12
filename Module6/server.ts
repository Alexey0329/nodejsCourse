import express, { Express } from 'express';
import cartRouter from './Router/cart.router';
import productRouter from './Router/product.router';
import { checkUser, checkUserId, checkUserIdAccess } from './middleware/authentication.middleware';

export const app: Express = express();
app.use(express.json());
const port = 8000;

app.use('/api/profile/cart', checkUser, checkUserIdAccess, checkUserId, cartRouter);
app.use('/api/products', checkUser, checkUserIdAccess, checkUserId, productRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

