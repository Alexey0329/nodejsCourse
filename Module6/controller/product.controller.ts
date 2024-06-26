import { Request, Response } from "express";
import { getProduct, getProducts } from "../service/product.service";
import { send500Error, getResponseObject } from '../util';

export const getProductsList = async (req: Request, res: Response): Promise<void> => {
  try {
    let productsResp = await getProducts();
    if (productsResp) {
      res.status(200).send(productsResp);
    } else {
      {
        throw new Error('Products not found');
      }
    }
  } catch (error) {
    send500Error(res);
  }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    let productResp = await getProduct(productId);
    if (productResp) {
      res.status(200).send(productResp);
    } else {
      res.status(404).send(getResponseObject( null,{ "message": "No product wich such id" }
      ));
    }
  } catch (error) {
    send500Error(res);
  }
}
