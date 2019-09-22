import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Message, IHero } from '@heros-inc/api-interfaces';

const app = express();
app.use(bodyParser.json());

//
// Routes
//

const greeting: Message = { message: 'Hello world!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/api/heroes', (req: Request, res: Response) => {
  const payload: IHero[] = [
    { id: '1', name: 'Superman', skills: [], vips: [] },
    { id: '2', name: 'Batman', skills: [], vips: [] },
    { id: '3', name: 'IronMan', skills: [], vips: [] }
  ];
  return res.send(payload);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
