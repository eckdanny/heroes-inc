import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Hero } from '../entity/hero.entity';

export class HeroController {
  private heroRepository = getRepository(Hero);
  async all(req: Request, res: Response, next: NextFunction) {
    return this.heroRepository.find();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    return this.heroRepository.findOne(req.params.heroId);
  }

  async save(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    return this.heroRepository.save(req.body);
  }
}
