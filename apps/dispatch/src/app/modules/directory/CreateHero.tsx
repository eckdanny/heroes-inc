import React, { useEffect, useState, ChangeEvent } from 'react';
import { IHero, ISkill } from '@heros-inc/api-interfaces';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';

type CreateHeroProps = {};

type CreateHeroPayload = Pick<IHero, 'name'> & { skills: Array<ISkill['id']> };

export const CreateHero: React.FC<CreateHeroProps & RouteComponentProps> = ({
  match
}) => {
  const breadcrumbLinks = [
    { path: '/directory', label: 'Heroes' },
    { path: '/directory/new', label: 'New', active: true }
  ];
  const [skills, setSkills] = useState(null);
  useEffect(() => {
    fetch(`/api/skills`)
      .then(r => r.json())
      .then(skills => setSkills(skills))
      .catch(err => console.log(err));
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

      <Card>
        <CardHeader tag="h4">Create Hero</CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: '',
              skills: []
            }}
            onSubmit={(values, actions) => {
              fetch('/api/heroes', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                })
                .catch(err => {
                  console.log(err);
                });
            }}
            render={props => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                      id="newHeroFormName"
                      type="text"
                      name="name"
                      placeholder="e.g.; Batman"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      spellCheck={false}
                    />
                  </FormGroup>
                  {skills && skills.length > 0 && (
                    <FormGroup>
                      <Label>Skills:</Label>
                      <FormGroup check>
                        {(skills as ISkill[]).map(skill => {
                          return (
                            <div className="form-check" key={skill.id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={skill.id}
                                id={`newHeroFormSkills_${skill.id}`}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const value = e.target.value;
                                  const checked = e.target.checked;
                                  const updatedSkills = checked
                                    ? [...props.values.skills, value]
                                    : props.values.skills.filter(
                                        skillId => skillId !== value
                                      );
                                  props.setFieldValue('skills', updatedSkills);
                                }}
                                checked={props.values.skills.includes(skill.id)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`newHeroFormSkills_${skill.id}`}
                              >
                                {skill.name}
                              </label>
                            </div>
                          );
                        })}
                      </FormGroup>
                    </FormGroup>
                  )}
                  {props.errors.name && (
                    <div id="feedback">{props.errors.name}</div>
                  )}
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
