export type ExpressRoute = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  route: string;
  controller: NewableFunction;
  action: string;
};
