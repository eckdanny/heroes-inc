import { ExpressRoute } from './route-helpers';
import { HeroController } from '../controller/hero.controller';

export const heroRoutes: ExpressRoute[] = [
  {
    method: 'get',
    route: '/heroes',
    controller: HeroController,
    action: 'all'
  }
];
