import { Request, Response } from "express";
import { getProduct, getProducts } from "../service/product.service";
import { getUserId, checkUser, send500Error, checkUserIdAccess, parseRequestBody } from '../util';

export const getProductsList = (req: Request, res: Response): void => {
  try {
    const userId = getUserId(req, res);
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);

    let products = getProducts();
    if (products) {
      res.status(200).send({
        "data": products,
        "error": null
      });
    } else {
      {
        throw new Error('Products not found');
      }
    }
  } catch (error) {
    send500Error(res);
  }
}

export const getProductById = (req: Request, res: Response): void => {
  try {
    const productId: string = req.params.productId;
    const userId = getUserId(req, res);
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);

    let product = getProduct(productId);
    if (product) {
      res.status(200).send({
        "data": product,
        "error": null
      });
    } else {
      res.status(404).send({
        "data": null,
        "error": { "message": "No product wich such id" }
      });
    }
  } catch (error) {
    send500Error(res);
  }
}
