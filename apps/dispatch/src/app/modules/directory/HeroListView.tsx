import React, { useEffect, useState } from 'react';
import { Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
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
  const breadcrumbLinks = [
    { path: '/directory', label: 'Heroes', active: true }
  ];
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
          <strong>Oh No's!</strong> It looks like you don't have any heroes yet.
          Perhaps you should <Link to={`${match.path}/new`}>add a Hero</Link> to
          your roster!
        </Alert>
      )}
      <Button to={`${match.path}/new`} tag={Link} color="success">
        Add Hero
      </Button>
    </div>
  );
};
