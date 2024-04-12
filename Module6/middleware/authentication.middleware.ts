import { Request, Response, NextFunction } from "express";
import { getUserById } from "../service/user.service";
import { getUserId } from '../util';

export const checkUserId = (req: Request, res: Response, next: NextFunction)  => {
  const userId: string = getUserId(req, res);
  const user = getUserById(userId);
  if (user !== null) {
      return next();
  } else {
      throw new Error(`User with id [${userId}] does not exist`);
  }
}
