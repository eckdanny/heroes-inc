import { ExpressRoute } from './route-helpers';
import { SkillController } from '../controller/skill.controller';

export const skillRoutes: ExpressRoute[] = [
  {
    method: 'get',
    route: '/skills',
    controller: SkillController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/skills/:skillId',
    controller: SkillController,
    action: 'getById'
  },
  {
    method: 'post',
    route: '/skills',
    controller: SkillController,
    action: 'save'
  }
];
