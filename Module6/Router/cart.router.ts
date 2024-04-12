import express from 'express';
import { checkoutUserCart, deleteUserCart, getUserCart, updateUserCart } from '../controller/cart.controller';

const cartRouter = express.Router();

cartRouter.get('/', getUserCart);
cartRouter.put('/', updateUserCart);
cartRouter.delete('/', deleteUserCart);
cartRouter.post('/checkout', checkoutUserCart);

export default cartRouter;