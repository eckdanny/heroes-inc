import React from 'react';
import { IIncident } from '@heros-inc/api-interfaces';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';

type ICreateIncidentPayload = Pick<IIncident, 'name' | 'description'>;

type CreateIncidentProps = {} & RouteComponentProps;

export const CreateIncident: React.FC<CreateIncidentProps> = ({ match }) => {
  const breadcrumbLinks = [
    { path: '/intake', label: 'Incidents' },
    { path: '/intake/new', label: 'New', active: true }
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
      <Card>
        <CardHeader tag="h4">Create Incident</CardHeader>
        <CardBody>
          <Formik
            initialValues={
              {
                name: '',
                description: ''
              } as ICreateIncidentPayload
            }
            onSubmit={(values, actions) => {
              fetch('/api/incidents', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
              })
                .then(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                })
                .catch(err => console.log(err));
            }}
            render={props => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                      id="newIncidentName"
                      type="text"
                      name="name"
                      placeholder="e.g.; Spilled Milk"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      spellCheck={false}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input
                      id="newIncidentDescription"
                      type="textarea"
                      name="description"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                    />
                  </FormGroup>
                  <Button
                    block
                    type="submit"
                    color="success"
                    disabled={
                      props.isValidating || props.isSubmitting || !props.isValid
                    }
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};
