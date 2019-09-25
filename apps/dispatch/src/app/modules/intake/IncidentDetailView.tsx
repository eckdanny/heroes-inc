import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IIncident } from '@heros-inc/api-interfaces';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

type httpStatus = 'BUSY' | 'COMPLETE' | 'ERROR';

type IncidentDetailViewProps = {};

export const IncidentDetailView: React.FC<
  IncidentDetailViewProps & RouteComponentProps
> = ({ match }) => {
  const [incident, setIncident] = useState<IIncident>(null);
  useEffect(() => {
    fetch(`/api/incidents/${match.params.incidentId}`)
      .then(r => r.json())
      .then(incident => setIncident(incident))
      .catch(err => console.log(err));
  }, []);
  const breadcrumbLinks = [
    { path: '/intake', label: 'Incidents' },
    {
      path: `/intake/${match.params.incidentId}`,
      label: incident ? incident.id : match.params.incidentId,
      active: true
    }
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
      {incident && <pre>{JSON.stringify(incident, null, 2)}</pre>}
    </div>
  );
};
