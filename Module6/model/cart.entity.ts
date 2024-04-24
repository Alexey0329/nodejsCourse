import mongoose, { Schema, Document } from "mongoose";
import { ProductEntity } from "./product.entity";

export type ResponseObject = {
  data: any;
  error: any;
}

export interface CartItemEntity {
  product?: ProductEntity;
  count: number;
  product_id: string;
}

export interface CartEntity extends Document {
  _id?: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartItemPayload {
  productId: string;
  count: number;
}

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  items: [{
    product: {
      type: { type: String, required: false },
      title: { type: String, required: false },
      description: { type: String, required: false },
      price: { type: Number, required: false }
    }, 
    product_id: { type: String, required: false },
    count: { type: Number, required: true }
  }],
},
{
  versionKey: false,
});

export default mongoose.model<CartEntity>('Cart', CartSchema);


