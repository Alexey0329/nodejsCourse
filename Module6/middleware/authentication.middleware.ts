import { Request, Response, NextFunction } from "express";
import { getUserById } from "../service/user.service";
import { getUserId, handleError } from '../util';

export const checkUserId = (req: Request, res: Response, next: NextFunction)  => {
  const userId: string = getUserId(req, res);
  const user = getUserById(userId);
  if (user !== null) {
      return next();
  } else {
      throw new Error(`User with id [${userId}] does not exist`);
  }
}

export const checkUserIdAccess = (req: Request, res: Response, next: NextFunction): void => {
  const userId: string = getUserId(req, res);
  if (userId !== '81a04664-d3b4-4abd-ac44-20b4c0105af2' && userId !== '1bc07dd7-23ee-498d-a415-40b4a626d272') { //hardcoded admin id
    handleError(res, "You must be authorized user", 403);
  } else {
    return next();
  }
}

export const checkUser = (req: Request, res: Response, next: NextFunction): void => {
  return getUserId(req, res) ? next() : handleError(res, "User is not authorized", 401);
}
