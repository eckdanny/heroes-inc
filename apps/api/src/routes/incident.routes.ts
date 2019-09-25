import { ExpressRoute } from './route-helpers';
import { IncidentController } from '../controller/incident.controller';

export const incidentRoutes: ExpressRoute[] = [
  {
    method: 'get',
    route: '/incidents',
    controller: IncidentController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/incidents/:incidentId',
    controller: IncidentController,
    action: 'getById'
  },
  {
    method: 'post',
    route: '/incidents',
    controller: IncidentController,
    action: 'save'
  }
];
