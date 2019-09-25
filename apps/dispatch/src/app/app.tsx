import React, { Suspense, useContext } from 'react';
import { Route } from 'react-router-dom';
import { Header, Brand, Nav } from '@heros-inc/ui';
import { Context as RouterContext } from './core/routing';
import routes from './app.routes';
import { MqttProvider } from './core/MqttClient';
import { Notifier } from './Notifier';

export const App = () => {
  const routerContext = useContext(RouterContext);
  routerContext.setRoutes(routes);
  return (
    <>
      <MqttProvider url="mqtt://localhost:9001">
        <Header brand={<Brand />} nav={<Nav routes={routerContext.routes} />} />
        <main className="container">
          <Suspense fallback={<div>Loading Service Module...</div>}>
            {routerContext.routes.map(route => (
              <Route {...route} key={route.path as string} />
            ))}
          </Suspense>
        </main>
        <Notifier />
      </MqttProvider>
    </>
  );
};

export default App;
