import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './ormconfig';
import { heroRoutes } from './routes/hero.routes';
import { userRoutes } from './routes/user.routes';
import { skillRoutes } from './routes/skill.routes';

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

  [...heroRoutes, ...userRoutes, ...skillRoutes].forEach(route => {
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

  const server = app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`);
  });

  // insert new users for test
  // await connection.manager.save(
  //   connection.manager.create(User, {
  //     firstName: 'Timber',
  //     lastName: 'Saw',
  //     age: 27
  //   })
  // );
  // await connection.manager.save(
  //   connection.manager.create(User, {
  //     firstName: 'Phantom',
  //     lastName: 'Assassin',
  //     age: 24
  //   })
  // );
  // insert some heroes...
  // const hero = new Hero();
  // hero.name = 'Tech Man';
  // hero.skills = [];
  // const techSkill = await connection.manager.findOne(
  //   Skill,
  //   'aea46464-8fb3-4dec-b287-f43888857bb2'
  // );
  // hero.skills.push(techSkill);
  // await connection.manager.save(
  //   connection.manager.create(Hero, {
  //     name: 'Tech Man',
  //     skills: []
  //   })
  // );
  // await connection.manager.save(
  //   connection.manager.create(Skill, {
  //     name: 'Strength',
  //     description: 'Super strength'
  //   })
  // );
  // await connection.manager.save(
  //   connection.manager.create(Skill, {
  //     name: 'Speed',
  //     description: 'Super speed'
  //   })
  // );
  // await connection.manager.save(
  //   connection.manager.create(Skill, {
  //     name: 'Gadgets',
  //     description: 'Technologically advanced gadgetry'
  //   })
  // );

  server.on('error', console.error);
})();
