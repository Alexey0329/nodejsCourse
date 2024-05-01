import Product, { ProductEntity } from "../model/product.entity";

export const getProductsData = async (): Promise<ProductEntity[]> => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products data.");
  }
}

export const getProductById = async (id: string): Promise<ProductEntity | null> => {
  let product = null
  if (id) {
    product = await Product.findOne({ _id: id});
  } 
  return product;
}