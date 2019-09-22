import React, { useEffect, useState } from 'react';
import { Message } from '@heros-inc/api-interfaces';
import { Route, Link } from 'react-router-dom';
import './Home.scss';

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const [message, setMessage] = useState<Message['message']>('');

  useEffect(() => {
    fetch('/api')
      .then(r => r.json())
      .then(r => setMessage(r.message));
  }, []);

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
            <div>{message}</div>
          </div>
        )}
      />
    </div>
  );
};

export default Home;
