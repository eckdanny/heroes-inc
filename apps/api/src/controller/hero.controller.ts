import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Hero } from '../entity/hero.entity';

export class HeroController {
  private heroRepository = getRepository(Hero);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.heroRepository.find();
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.heroRepository.save(req.body);
  }
}
