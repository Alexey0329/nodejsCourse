import { ProductEntity } from "../model/product.entity";
import { getProductById, getProductsData } from "../repository/product.repository";

export const getProducts = (): ProductEntity[] => {
  return getProductsData();
}
export const getProduct = (id: string): ProductEntity | null => {
  return getProductById(id);
}