import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { IHero } from '@heros-inc/api-interfaces';
import './Directory.scss';

const HeroListView = () => <div>List View</div>;

const HeroDetailView = () => <div>Detail View</div>;

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps & RouteComponentProps> = ({
  match
}) => {
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
      .catch(err => {
        setStatus('ERROR');
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h3>Directory</h3>
      {heroes && heroes.length && (
        <ul>
          {heroes.map(hero => (
            <li key={hero.id}>
              <Link to={`${match.path}/${hero.id}`}>{hero.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Route path={`${match.path}`} exact component={HeroListView} />
      <Route path={`${match.path}/:id`} component={HeroDetailView} />
    </div>
  );
};

export default Directory;
