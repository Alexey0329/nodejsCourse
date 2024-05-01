import { ResponseObject } from "../model/cart.entity";
import { getProductById, getProductsData } from "../repository/product.repository";
import { getResponseObject } from "../util";

export const getProducts = async (): Promise<ResponseObject | []> => {
  let products = await getProductsData();
  return products ? getResponseObject(products, null) : [];
}

export const getProduct = async (id: string): Promise<ResponseObject | null> => {
  let product = await getProductById(id);
  return product ? getResponseObject(product, null) : null;
}