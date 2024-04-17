import { ProductEntity } from "./product.entity";

export type ResponseObject = {
  data: any;
  error: any;
}

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartItemPayload {
  productId: string;
  count: number;
}


