import React, { Suspense, lazy, useContext } from 'react';
import { Route, NavLink as RouterNavLink } from 'react-router-dom';
import { Header, Brand, Nav } from '@heros-inc/ui';
import { Context as RouterContext } from './core/routing';

const Home = lazy(() => import('./Home'));
const Intake = lazy(() => import('./modules/intake'));
const Directory = lazy(() => import('./modules/directory'));
const Dashboard = () => <div>Dashboard COMMING SOON...</div>;
const Dispatch = () => <div>Dispatch COMMING SOON...</div>;

export const App = () => {
  const routerContext = useContext(RouterContext);
  routerContext.setRoutes([
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/directory', name: 'Directory', component: Directory },
    { path: '/intake', name: 'Intake', component: Intake },
    { path: '/dispatch', name: 'Dispatch', component: Dispatch },
    { path: '/dashboad', name: 'Dashboard', component: Dashboard }
  ]);
  return (
    <>
      <Header brand={<Brand />} nav={<Nav routes={routerContext.routes} />} />
      <main className="container">
        <Suspense fallback={<div>Loading Service Module...</div>}>
          {routerContext.routes.map(route => (
            <Route {...route} key={route.path as string} />
          ))}
        </Suspense>
      </main>
    </>
  );
};

export default App;
