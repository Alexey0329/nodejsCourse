import { Request, Response } from 'express';
import { checkoutCart, deleteCart, getCart, updateCart } from "../service/cart.service";
import { CartEntity } from '../model/cart.entity';
import { getUserId, checkUser, send500Error, checkUserIdAccess, parseRequestBody } from '../util';
import { CartUpdateValidator } from '../validator/cart.validator';


export const getUserCart = (req: Request, res: Response): void => {
  try {
    const userId = getUserId(req, res);
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);

    const cart = getCart(userId);
    if (cart) {
      res.status(200).send({
        "data": {
          "cart": cart,
          "total": cart.items.reduce((total, item) => total + (item.product.price * item.count), 0)
        },
        "error": null
      });
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
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);
    const reqBody: any = await parseRequestBody(req);

    if (CartUpdateValidator.validate(reqBody).error) {
      res.status(400).send({
        "data": null,
        "error": {
          "message": "Products are not valid"
        }
      });
      return;
    }

    const result: CartEntity = updateCart(userId, reqBody);
    if (result) {
      res.status(200).send({
        "data": {
          "cart": {
            "id": result.id,
            "items": result.items,
          },
          "total": result.items.reduce((total, item) => total + (item.product.price * item.count), 0),
        },
        "error": null
      });
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
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);

    const result = deleteCart(userId);
    if (result) {
      res.status(200).send({
        "data": {
          "success": true
        },
        "error": null
      });
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
    checkUser(req, res, userId);
    checkUserIdAccess(req, res, userId);

    const result = checkoutCart(userId);
    if (result) {
      res.status(200).send({
        "data": result,
        "error": null
      });
    } else {
      res.status(400).send({
        "data": null,
        "error": {
          "message": "Cart is empty"
        }
      });
    }
  } catch (error) {
    send500Error(res);
  }
}




