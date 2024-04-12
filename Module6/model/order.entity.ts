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
