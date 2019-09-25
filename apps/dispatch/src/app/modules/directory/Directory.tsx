import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
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
      <Switch>
        <Route path={`${match.path}`} exact component={HeroListView} />
        <Route path={`${match.path}/new`} exact component={CreateHero} />
        <Route path={`${match.path}/:heroId`} component={HeroDetailView} />
      </Switch>
    </div>
  );
};

export default Directory;
