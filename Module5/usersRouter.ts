import { v4 as uuidv4 } from 'uuid';
import { parseRequestBody } from './util.js';

export interface User {
  id: string;
  name: string;
  email: string;
  hobbies: string[];
}

export interface RequestBody {
  name: string;
  email: string;
}

export let users: Record<string, User> = {};

export async function usersRouter(req: any, res: any) {
  let userId: string;
  let response: any;

  switch (req.method) {
    case 'POST':
      userId = uuidv4();
      const reqBody: any = await parseRequestBody(req);
      const name: string = reqBody.name;
      const email: string = reqBody.email;
      users[userId] = { id: userId, name: name, email: email, hobbies: [] };
      res.writeHead(201, { 'Content-Type': 'application/json' });
      response = {
        data: {
          user: {
            id: users[userId].id,
            name: users[userId].name,
            email: users[userId].email
          },
          links: {
            self: `/api/users/${userId}`,
            hobbies: `/api/users/${userId}/hobbies`
          }
        },
        error: null
      };
      res.end(JSON.stringify(response));
      break;
    case 'GET':
      const usersArray: User[] = Object.values(users);
      response = {
        data: usersArray.map((user: User) => ({
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          links: {
            self: `/api/users/${user.id}`,
            hobbies: `/api/users/${user.id}/hobbies`
          }
        })),
        error: null
      };
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
      break;
    case 'DELETE':
      userId = req.url.split('/')[3];
      if (users[userId]) {
        delete users[userId];
        const response = {
          data: {
            success: true
          },
          error: null
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          data: null,
          error: `User with id ${userId} doesn't exist`
        }));
      }
      break;
    default:
      res.writeHead(405);
      res.end('Method not allowed');
      break;
  }
}