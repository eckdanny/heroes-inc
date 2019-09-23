import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Message, IHero } from '@heros-inc/api-interfaces';
import { Routes } from './routes';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(process.env.port || 3333);

    // insert new users for test
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24
      })
    );

    // console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
    console.log('up :)');
  })
  .catch(error => console.log(error));

// const app = express();
// app.use(bodyParser.json());

// //
// // Routes
// //

// const greeting: Message = { message: 'Hello world!' };

// app.get('/', (req, res) => {
//   res.send(greeting);
// });

// app.get('/heroes', (req: Request, res: Response) => {
//   const payload: IHero[] = [
//     { id: '1', name: 'Superman', skills: [], vips: [] },
//     { id: '2', name: 'Batman', skills: [], vips: [] },
//     { id: '3', name: 'IronMan', skills: [], vips: [] }
//   ];
//   return res.send(payload);
// });

// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   console.log('Listening at http://localhost:' + port + '/api');
// });
// server.on('error', console.error);
