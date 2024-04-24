import { ResponseObject } from "../model/cart.entity";
import { createNewOrder } from "../repository/order.repository";
import { getResponseObject } from "../util";

export const checkoutCart = async (userId: string): Promise<ResponseObject | null> => {
  let resp = await createNewOrder(userId);
  return resp ? getResponseObject(resp, null): null;
}
