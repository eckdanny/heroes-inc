import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { IHero } from '@heros-inc/api-interfaces';
import './HeroListView.scss';

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type HeroListViewProps = {};

export const HeroListView: React.FC<
  HeroListViewProps & RouteComponentProps
> = ({ match }) => {
  const [status, setStatus] = useState<httpStatus>(null);
  const [heroes, setHeroes] = useState<IHero[]>(null);
  useEffect(() => {
    setStatus('BUSY');
    fetch('/api/heroes')
      .then(r => r.json())
      .then(heroes => {
        setStatus('COMPLETE');
        setHeroes(heroes);
      })
      .catch(err => setStatus('ERROR'));
  }, []);
  return (
    <div>
      {heroes && heroes.length > 0 && (
        <ul>
          {heroes.map(hero => (
            <li key={hero.id}>
              <Link to={`${match.path}/${hero.id}`}>{hero.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
