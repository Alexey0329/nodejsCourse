import { Request, Response } from 'express';

export const parseRequestBody = (req) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch (error) {
      reject(error);
    }
  });

  req.on('error', (error) => {
    reject(error);
  });
});


export const getUserId = (req: Request, res: Response): string => {
  return req.headers['x-user-id']?.toString() ?? '';
}
export const checkUser = (req: Request, res: Response, userId: string): void => {
  if (!userId) {
    res.status(401).send({
      "data": null,
      "error": {
        "message": "User is not authorized"
      }
    });
    return
  }
}

export const send500Error = (res: Response): void => {
  res.status(500).send({
    "data": null,
    "error": {
      "message": "Internal Server error"
    }
  });
  return;
}

export const checkUserIdAccess = (req: Request, res: Response, userId: string): void => {
  if (userId !== '81a04664-d3b4-4abd-ac44-20b4c0105af2' && userId !== '1bc07dd7-23ee-498d-a415-40b4a626d272') { //hardcoded admin id
    res.status(403).send({
      "data": null,
      "error": {
        "message": "You must be authorized user"
      }
    });
    return;
  }
}