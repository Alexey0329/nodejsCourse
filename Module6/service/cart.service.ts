import { CartEntity, CartItemEntity, CartItemPayload, ResponseObject } from "../model/cart.entity";
import { ProductEntity } from "../model/product.entity";
import { deleteCartData, getCartData, saveUserCart } from "../repository/cart.repository";
import { getProductById } from "../repository/product.repository";
import { getResponseObject } from "../util";
import Cart from "../model/cart.entity";

export const getCart = async (userId: string): Promise<CartEntity> => {
  let cart = await getCartData(userId);
  if (!cart) {
    cart = new Cart({ userId: userId, items: [], isDeleted: false });
    await saveUserCart(cart);
  }
  return cart;
}

export const getCartResponce = async (userId: string): Promise<ResponseObject> => {
  const cart = await getCart(userId);
  const total = await getTotalCartPrice(cart);
  let respObject = getResponseObject(
    {
      "cart": cart,
      "total": total
    }
    , null);
  return respObject;
}

export const deleteCart = async (userId: string): Promise<ResponseObject | null> => {
  if(await deleteCartData(userId)) {
    return getResponseObject({"success": true}, null); 
  }
  return null;
}


export const updateCart = async (userId: string, cartItem: CartItemPayload): Promise<ResponseObject> => {
  let userCart: CartEntity = await getCart(userId) as CartEntity;
  const itemIndex = userCart.items.findIndex(item => item['product_id'] === cartItem.productId);
  if (itemIndex !== -1) {
    userCart.items[itemIndex].count += cartItem.count;
  } else {
    let product: ProductEntity | null = await getProductById(cartItem.productId);
    if (product) {
      let newCartItem: CartItemEntity = {
        count: cartItem.count,
        product_id: cartItem.productId
      };
      userCart.items.push(newCartItem);
    }
  }
  await saveUserCart(userCart);
  return getCartResponce(userId);
}

export const getTotalCartPrice = async (cart: CartEntity): Promise<number> => {
  let cartItemsWithPrice = await Promise.all(cart.items.map(async item => {
    let product: ProductEntity | null = await getProductById(item.product_id);
    if (product) {
      return { product: product, count: item.count };
    }
    return null;
  }));
  cartItemsWithPrice = cartItemsWithPrice.filter(item => item !== null);
  return cartItemsWithPrice.reduce((total, item) => total + (item!.product.price * item!.count), 0);
}
