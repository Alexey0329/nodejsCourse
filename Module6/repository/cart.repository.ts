import { CartEntity } from "../model/cart.entity";
import { OrderEntity } from "../model/order.entity";
import { carts, orderEntities } from "../test-data";

export const getCartData = (userId: string): CartEntity | null => {
  return carts.find(cart => cart.userId === userId) || null;
}

export const saveUserCart = (cart: CartEntity): CartEntity => {
  const cartIndex = carts.findIndex(c => c.userId === cart.userId);
  if (cartIndex === -1) {
    carts.push(cart);
  } else {
    carts[cartIndex] = cart;
  }
  return cart;
}

export const deleteCartData = (userId: string): boolean => {
  const cartIndex = carts.findIndex(cart => cart.userId === userId);
  if (cartIndex !== -1) {
    carts[cartIndex].items = [];
    carts[cartIndex].isDeleted = true;
    return true;
  }
  return false;
}

export const createNewOrder = (userId: string): OrderEntity | boolean => {
  const cartIndex: number = carts.findIndex(cart => cart.userId === userId);
  const cart: CartEntity = carts[cartIndex];
  if (!cart || cart.items.length === 0 || cart.isDeleted) {
    return false;
  }
  const order: OrderEntity = {
    id: 'order-' + carts.length + 1,
    userId: cart.userId,
    cartId: cart.id,
    items: cart.items,
    payment: {
      type: 'creditCard',
      creditCard: {
        number: '1234-5678-1234-5678',
        expiration: '12/24',
        cvv: '123'
      }
    },
    delivery: {
      type: 'home',
      address: {
        street: 'home street',
        city: 'Springfield',
        state: 'IL',
        zip: '54321'
      }
    },
    comments: 'Please deliver before 5pm',
    status: 'created',
    total: cart.items.reduce((total, item) => total + item.count * item.product.price, 0)
  }
  carts[cartIndex].isDeleted = true;
  orderEntities.push(order);
  return order;
}


