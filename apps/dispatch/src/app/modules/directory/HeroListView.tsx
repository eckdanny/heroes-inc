import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IHero } from '@heros-inc/api-interfaces';
import { Alert } from 'reactstrap';
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
      {heroes && heroes.length === 0 && (
        <Alert color="danger" fade={false}>
          <strong>Oh No's!</strong> It looks like you don't have any heroes yet!
        </Alert>
      )}
      <Button to={`${match.path}/new`} tag={Link} color="success">
        Add Hero
      </Button>
    </div>
  );
};
