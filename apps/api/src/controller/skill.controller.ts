import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Skill } from '../entity/skill.entity';

export class SkillController {
  private skillRepository = getRepository(Skill);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.skillRepository.find();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    return this.skillRepository.findOne(req.params.skillId);
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.skillRepository.save(req.body);
  }
}
