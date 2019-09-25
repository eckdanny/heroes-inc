import React, { useState, useEffect } from 'react';
import { IIncident } from '@heros-inc/api-interfaces';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type IncidentListViewProps = {};

export const IncidentListView: React.FC<
  IncidentListViewProps & RouteComponentProps
> = ({ match }) => {
  const [status, setStatus] = useState<httpStatus>(null);
  const [incidents, setIncidents] = useState<IIncident[]>(null);
  useEffect(() => {
    fetch('/api/incidents')
      .then(r => r.json())
      .then(incidents => {
        setIncidents(incidents);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const breadcrumbLinks = [
    { path: '/intake', label: 'Incidents', active: true }
  ];
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
      {incidents && incidents.length === 0 && (
        <Alert color="success" fade={false}>
          No incidents have been reported yet.
        </Alert>
      )}
      {incidents && incidents.length > 0 && (
        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <Link to={`${match.path}/${incident.id}`}>{incident.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Button to={`${match.path}/new`} tag={Link} color="success">
        Add Incident
      </Button>
    </div>
  );
};
