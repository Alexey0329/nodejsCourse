import { ProductEntity } from "../model/product.entity";
import { productsData } from "../test-data"

export const getProductsData = (): ProductEntity[] => {
  return productsData;
}

export const getProductById = (id: string): ProductEntity | null => {
  return getProductsData().find(product => product.id === id) || null;
}