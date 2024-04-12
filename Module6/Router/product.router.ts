import express from 'express';
import { getProductById, getProductsList } from '../controller/product.controller';

const productRouter = express.Router();

productRouter.get('/', getProductsList);
productRouter.get('/:productId', getProductById);

export default productRouter;