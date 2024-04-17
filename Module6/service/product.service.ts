import { ResponseObject } from "../model/cart.entity";
import { getProductById, getProductsData } from "../repository/product.repository";
import { getResponseObject } from "../util";

export const getProducts = (): ResponseObject | [] => {
  let products = getProductsData();
  return products ? getResponseObject(products, null) : [];
}

export const getProduct = (id: string): ResponseObject | null => {
  let product = getProductById(id);
  return product ? getResponseObject(product, null) : null;
}