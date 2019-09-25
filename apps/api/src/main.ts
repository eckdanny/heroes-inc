import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './ormconfig';
import { heroRoutes } from './routes/hero.routes';
import { userRoutes } from './routes/user.routes';
import { skillRoutes } from './routes/skill.routes';
import { incidentRoutes } from './routes/incident.routes';

import { Hero } from './entity/hero.entity';
import { User } from './entity/user.entity';
import { Skill } from './entity/skill.entity';

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

  [...heroRoutes, ...userRoutes, ...skillRoutes, ...incidentRoutes].forEach(
    route => {
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
    }
  );

  const server = app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`);
  });

  await connection.manager.save(
    connection.manager.create(Skill, {
      name: 'Strength',
      description: 'Super strength'
    })
  );
  await connection.manager.save(
    connection.manager.create(Skill, {
      name: 'Speed',
      description: 'Super speed'
    })
  );
  await connection.manager.save(
    connection.manager.create(Skill, {
      name: 'Gadgets',
      description: 'Technologically advanced gadgetry'
    })
  );

  server.on('error', console.error);
})();
