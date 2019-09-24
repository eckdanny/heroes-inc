import React from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { HeroListView } from './HeroListView';
import { HeroDetailView } from './HeroDetailView';
import { CreateHero } from './CreateHero';
import './Directory.scss';

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps & RouteComponentProps> = ({
  match
}) => {
  return (
    <div>
      <h3>Directory</h3>
      <Route path={`${match.path}`} exact component={HeroListView} />
      <Route path={`${match.path}/new`} component={CreateHero} />
      <Route path={`${match.path}/:id`} component={HeroDetailView} />
    </div>
  );
};

export default Directory;
