import { CartEntity } from "../model/cart.entity";
import Cart from "../model/cart.entity";

export const getCartData = async (userId: string): Promise<CartEntity | null> => {
  let cart = null
  if (userId) {
    cart = await Cart.findOne({ userId: userId}); // why findById is not working?
  } 
  return cart;
}

export const updateCart = async (cartEntity: CartEntity): Promise<CartEntity | null> => {
  let updatedCart;
  try {
      updatedCart = await Cart.updateOne({ userId: cartEntity.userId }, cartEntity);
      console.log("Update result: ", updatedCart);
    return updatedCart;
  } catch (err) {
    console.error("Error saving cart: ", err);
    return null;
  }
}

export const saveUserCart = async (cartEntity: CartEntity): Promise<CartEntity | null> => {
  let savedCart;
  try {
      savedCart = await cartEntity.save();
      console.log("Save result: ", savedCart);
      return savedCart;
  } catch (err) {
    console.error("Error saving cart: ", err);
    return null;
  }
}

export const deleteCartData = async (userId: string): Promise<boolean> => {
  try {
   const result = await Cart.updateOne(
      { userId: userId },
      { isDeleted: true }
    );
    console.log("Delete result: ", result);
    return true;
  } catch (err) {
    console.error("Error deleting user: ", err);
    return false;
  }
}



