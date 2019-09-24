import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IHero } from '@heros-inc/api-interfaces';
import './HeroDetailView.scss';

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type HeroDetailViewProps = {};

export const HeroDetailView: React.FC<
  HeroDetailViewProps & RouteComponentProps
> = ({ match }) => {
  const [status, setStatus] = useState<httpStatus>(null);
  const [hero, setHero] = useState<IHero>(null);
  useEffect(() => {
    setStatus('BUSY');
    fetch(`/api/heroes/${match.params.id}`)
      .then(r => r.json())
      .then(heroes => {
        setStatus('COMPLETE');
        setHero(heroes);
      })
      .catch(err => setStatus('ERROR'));
  }, []);
  return <div>{hero && <pre>{JSON.stringify(hero, null, 2)}</pre>}</div>;
};
