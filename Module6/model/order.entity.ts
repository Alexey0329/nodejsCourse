import mongoose, { Schema } from "mongoose";
import { CartItemEntity } from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';

export interface CreditCardDetails {
  number: string;
  expiration: string;
  cvv: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentDetails {
  type: string;
  creditCard?: CreditCardDetails;
}

export interface DeliveryDetails {
  type: string;
  address: Address;
}

export interface OrderEntity {
  id: string, 
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: PaymentDetails
  delivery: DeliveryDetails;
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema({
userId: { type: String, required: true },
cartId: { type: String, required: true },
items: [{
  product: {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  product_id:  { type: String },
  count: {type: Number, required: true}
}],
payment: {
  type: {
    type: String,
    required: true
  },
  creditCard: {
    number: { type: String },
    expiration: { type: String },
    cvv: { type: String }
  }
},
delivery: {
  type: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  }
},
comments: { type: String },
status: { type: String, enum: ['created', 'completed'], default: 'created' },
total: { type: Number, required: true }
},{
  versionKey: false,
});

export default mongoose.model<OrderEntity>('Order', OrderSchema);

