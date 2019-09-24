import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Home.scss';

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  return (
    <div>
      <h1>Welcome to home component!</h1>
      <ul>
        <li>
          <Link to="/">home root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => (
          <div>
            <h3>Blah blah blah...</h3>
          </div>
        )}
      />
    </div>
  );
};

export default Home;
