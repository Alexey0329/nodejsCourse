import { CartEntity, CartItemPayload, ResponseObject } from "../model/cart.entity";
import { ProductEntity } from "../model/product.entity";
import { createNewOrder, deleteCartData, getCartData, saveUserCart } from "../repository/cart.repository";
import { getProductById } from "../repository/product.repository";
import { v4 as uuidv4 } from 'uuid';
import { getResponseObject } from "../util";

export const getCart = (userId: string): CartEntity => {
  let cart = getCartData(userId);
  if (!cart) {
    cart = { id: uuidv4(), userId: userId, items: [], isDeleted: false };
    saveUserCart(cart);
  }
  return cart;
}

export const getCartResponce = (userId: string): ResponseObject => {
  let cart = getCart(userId);
  let respObject = getResponseObject(
    {
      "cart": cart,
      "total": cart.items.reduce((total, item) => total + (item.product.price * item.count), 0)
    }
    , null);
  return respObject;
}

export const deleteCart = (userId: string): ResponseObject | null => {
  if(deleteCartData(userId)) {
    return getResponseObject({"success": true}, null); 
  }
  return null;
}

export const checkoutCart = (userId: string): ResponseObject | null => {
  let resp = createNewOrder(userId);
  return resp ? getResponseObject(resp, null): null;
}

export const updateCart = (userId: string, cartItem: CartItemPayload): ResponseObject => {
  let userCart: CartEntity = getCart(userId) as CartEntity;
  const itemIndex = userCart.items.findIndex(item => item.product.id === cartItem.productId);
  if (itemIndex !== -1) {
    userCart.items[itemIndex].count += cartItem.count;
  } else {
    let product: ProductEntity = getProductById(cartItem.productId) as ProductEntity;
    userCart.items.push({ product: product, count: cartItem.count });
  }
  saveUserCart(userCart);
  let respObject = getResponseObject(
    {
      "cart": {
        "id": userCart.id,
        "items": userCart.items,
      },
      "total": userCart.items.reduce((total, item) => total + (item.product.price * item.count), 0),
    }
    , null);
  return respObject;
}
