import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { IncidentListView } from './IncidentListView';
import { CreateIncident } from './CreateIncident';
import { IncidentDetailView } from './IncidentDetailView';

type IntakeProps = {};

const Intake: React.FC<IntakeProps & RouteComponentProps> = ({ match }) => {
  return (
    <div>
      <h3>Intake</h3>
      <Switch>
        <Route path={`${match.path}`} exact component={IncidentListView} />
        <Route path={`${match.path}/new`} exact component={CreateIncident} />
        <Route
          path={`${match.path}/:incidentId`}
          component={IncidentDetailView}
        />
      </Switch>
    </div>
  );
};

export default Intake;
