import { IncomingMessage, ServerResponse } from 'http';
import { User, users } from './usersRouter';
import { parseRequestBody } from './util.js';


export async function hobbiesRouter(req: IncomingMessage, res: ServerResponse) {
  let response: any;
  const userId: string = req.url?.split('/')[3] || '';
  const user: User = users[userId];

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: null,
      error: `User with id ${userId} doesn't exist`
    }));
    return;
  }
  
  switch (req.method) {
    case 'GET':
      res.setHeader('Cache-Control', 'private, max-age=3600');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      response = {
        data: {
          hobbies: user.hobbies,
          links: {
            self: `/api/users/${userId}/hobbies`,
            user: `/api/users/${userId}`
          }
        },
        error: null
      }
      res.end(JSON.stringify(response));
      break;
    case 'PATCH':
        const reqBody: any = await parseRequestBody(req);
        const hobbies: string[] = reqBody.hobbies;
        if (hobbies && Array.isArray(hobbies)) {
          user.hobbies = [...new Set([...user.hobbies, ...hobbies])];
          res.writeHead(200, { 'Content-Type': 'application/json' });
          response = {
            data: {
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              },
              links: {
                self: `/api/users/${userId}`,
                hobbies: `/api/users/${userId}/hobbies`
              }
            },
            error: null
          }
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(400);
          res.end('Bad Request');
        }
      break;
    default:
      res.writeHead(405);
      res.end('Method not allowed');
      break;
  }
}

