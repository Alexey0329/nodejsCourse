import * as http from 'http';
import { UrlWithParsedQuery, parse } from 'url';
import { usersRouter } from './usersRouter.js';
import { hobbiesRouter } from './hobbiesRouter.js';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl: UrlWithParsedQuery = parse(req.url || '', true);
  const path: string = parsedUrl.pathname || '';
  const trimmedPath: string = path.replace(/^\/+|\/+$/g, '');

  switch (trimmedPath) {
    case trimmedPath.match(/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/hobbies/)?.input:
      hobbiesRouter(req, res);
      break;
    case 'api/users':
    case trimmedPath.match(/api\/users\/\w+/)?.input:
      usersRouter(req, res);
      break;

    default:
      res.writeHead(404);
      res.end('Not Found');
      break;
  }
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});