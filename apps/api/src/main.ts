import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Message, IHero } from '@heros-inc/api-interfaces';
import config from './ormconfig';
import { Routes } from './routes';

(async () => {
  let connection: Connection;

  try {
    connection = await createConnection(config);
  } catch (err) {
    console.log(err);
    return err;
  }

  const app = express();
  app.use(bodyParser.json());

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

  const server = app.listen(process.env.API_PORT);
  server.on('listening', () =>
    console.log(`Listening on port ${process.env.API_PORT}`)
  );
  server.on('error', console.error);
})();
