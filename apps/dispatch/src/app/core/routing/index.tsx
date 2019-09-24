import { createContext } from 'react';
import { RouteProps } from 'react-router-dom';

type RoutableModule = Pick<
  RouteProps,
  'component' | 'path' | 'exact' | 'sensitive' | 'strict'
> & {
  name: string;
};

class RouterContext {
  private _routes: RoutableModule[] = [];

  setRoutes(routes: RoutableModule[]) {
    this._routes = routes;
  }
  get routes() {
    return this._routes;
  }
}

const routerContext = new RouterContext();

const Context = createContext<RouterContext>(routerContext);

const { Provider, Consumer } = Context;

export { Context, Provider, Consumer };
