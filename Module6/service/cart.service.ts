import { CartEntity, CartItemPayload } from "../model/cart.entity";
import { OrderEntity } from "../model/order.entity";
import { ProductEntity } from "../model/product.entity";
import { createNewOrder, deleteCartData, getCartData, saveUserCart } from "../repository/cart.repository";
import { getProductById } from "../repository/product.repository";
import { v4 as uuidv4 } from 'uuid';

export const getCart = (userId: string): CartEntity => {
  let cart = getCartData(userId);
  if (!cart) {
    cart = { id: uuidv4(), userId: userId, items: [], isDeleted: false };
    saveUserCart(cart);
  }
  return cart;
}

export const deleteCart = (userId: string): boolean => {
  return deleteCartData(userId);
}

export const checkoutCart = (userId: string): OrderEntity | boolean => {
  return createNewOrder(userId);
}

export const updateCart = (userId: string, cartItem: CartItemPayload): CartEntity => {
  let userCart: CartEntity = getCart(userId) as CartEntity;
  const itemIndex = userCart.items.findIndex(item => item.product.id === cartItem.productId);
  if (itemIndex !== -1) {
    userCart.items[itemIndex].count += cartItem.count;
  } else {
    let product: ProductEntity = getProductById(cartItem.productId) as ProductEntity;
    userCart.items.push({ product: product, count: cartItem.count });
  }
  saveUserCart(userCart);
  return userCart;
}
