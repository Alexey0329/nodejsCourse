import { Request, Response } from 'express';
import { checkoutCart, deleteCart, getCartResponce, updateCart } from "../service/cart.service";
import { ResponseObject } from '../model/cart.entity';
import { getUserId, send500Error, getResponseObject } from '../util';
import { CartUpdateValidator } from '../validator/cart.validator';


export const getUserCart = (req: Request, res: Response): void => {
  try {
    const userId = getUserId(req, res);
    const cartResp = getCartResponce(userId);
    if (cartResp) {
      res.status(200).send(cartResp);
    } else {
      throw new Error('Cart not found');
    }
  } catch (error) {
    send500Error(res);
  }
}

export const updateUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getUserId(req, res);
    if (CartUpdateValidator.validate(req.body).error) {
      res.status(400).send(getResponseObject(null, {
        "message": "Products are not valid"
      }));
      return;
    }

    const updateResp: ResponseObject = updateCart(userId, req.body);
    if (updateResp) {
      res.status(200).send(updateResp);
    } else {
      throw new Error('Cart cannot be updated');
    }
  } catch (error) {
    send500Error(res);
  }
}

export const deleteUserCart = (req: Request, res: Response) => {
  try {
    const userId = getUserId(req, res);
    const deleteResp = deleteCart(userId);
    if (deleteResp) {
      res.status(200).send(deleteResp);
    } else {
      throw new Error('Cart cannot be deleted');
    }
  } catch (error) {
    send500Error(res);
  }
}

export const checkoutUserCart = (req: Request, res: Response): void => {
  try {
    const userId = getUserId(req, res);
    const checkoutResp = checkoutCart(userId);
    if (checkoutResp) {
      res.status(200).send(checkoutResp);
    } else {
      res.status(400).send(getResponseObject(null, {
        "message": "Cart is empty."
      }));
    }
  } catch (error) {
    send500Error(res);
  }
}




