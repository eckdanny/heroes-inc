import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Hero } from '../entity/hero.entity';

async function heroGetAll(request: Request, response: Response) {
  const heroRepository = getManager().getRepository(Hero);
  const heroes = heroRepository.find();
  response.send(heroes);
}

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/heroes',
    method: 'get',
    action: heroGetAll
  }
];
