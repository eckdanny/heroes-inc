import React, { Suspense, lazy } from 'react';
import { Route, NavLink as RouterNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { Header, Brand } from '@heros-inc/ui';

const Home = lazy(() => import('./Home'));
const Intake = lazy(() => import('./modules/intake'));
const Dashboard = () => <div>COMMING SOON...</div>;

export const App = () => {
  return (
    <>
      <Header
        nav={
          <nav className="nav my-2 my-md-0 mr-md-3">
            {[
              ['/', 'Home'],
              ['/directory', 'Directory'],
              ['/intake', 'Intake'],
              ['/dispatch', 'Dispatch'],
              ['/dashboard', 'Dashboard']
            ].map(([route, name]) => (
              <li className="nav-item" key={route}>
                <NavLink
                  to={route}
                  exact
                  tag={RouterNavLink}
                  className="p-2"
                  activeClassName="active disabled"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </nav>
        }
        brand={<Brand />}
      />
      <main className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact component={Home} />
          <Route path="/intake" component={Intake} />
          <Route path="/dashboard" component={Dashboard} />
        </Suspense>
      </main>
    </>
  );
};

export default App;
