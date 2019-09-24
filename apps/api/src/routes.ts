import { UserController } from './controller/UserController';

type ExpressTypeORMRoute = {
  method: 'get' | 'post' | 'put' | 'delete';
  route: string;
  controller: NewableFunction;
  action: string;
};

export const Routes: ExpressTypeORMRoute[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove'
  }
];
