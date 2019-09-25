import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Incident } from '../entity/incident.entity';

export class IncidentController {
  private incidentRepository = getRepository(Incident);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.incidentRepository.find();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    return this.incidentRepository.findOne(req.params.incidentId);
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.incidentRepository.save(req.body);
  }
}
