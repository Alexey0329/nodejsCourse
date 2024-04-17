import { Request, Response } from 'express';
import { ResponseObject } from './model/cart.entity';

export const getUserId = (req: Request, res: Response): string => {
  return req.headers['x-user-id']?.toString() ?? '';
}

export const send500Error = (res: Response): void => handleError(res, "Internal Server error", 500);

export const handleError = (res: Response, errorTxt: string, status: number): void => {
  res.status(status).send({
    "data": null,
    "error": {
      "message": errorTxt
    }
  });
  return;
}

export const getResponseObject = (data: any, error: any): ResponseObject => {
  return {
    "data": data,
    "error": error
  }
}
