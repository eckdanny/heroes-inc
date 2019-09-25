import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { IHero } from '@heros-inc/api-interfaces';
import './HeroDetailView.scss';

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type HeroDetailViewProps = {};

export const HeroDetailView: React.FC<
  HeroDetailViewProps & RouteComponentProps
> = ({ match }) => {
  const [status, setStatus] = useState<httpStatus>(null);
  const [hero, setHero] = useState<IHero>(null);
  const breadcrumbLinks = [
    { path: '/directory', label: 'Heroes' },
    {
      path: `/directory/${match.params.heroId}`,
      label: hero ? hero.id : match.params.heroId,
      active: true
    }
  ];
  useEffect(() => {
    setStatus('BUSY');
    fetch(`/api/heroes/${match.params.heroId}`)
      .then(r => r.json())
      .then(heroes => {
        setStatus('COMPLETE');
        setHero(heroes);
      })
      .catch(err => setStatus('ERROR'));
  }, []);
  return (
    <div>
      <Breadcrumb>
        {breadcrumbLinks.map(link => {
          return link.active ? (
            <BreadcrumbItem active key={link.path}>
              {link.label}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      {hero && <pre>{JSON.stringify(hero, null, 2)}</pre>}
    </div>
  );
};
