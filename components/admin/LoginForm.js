import React from 'react';
import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import {
  Button,
  Dimmer,
  Divider,
  Loader,
  Form,
  Grid,
  Message,
  Segment} from 'semantic-ui-react'
import { Container } from 'next/app';
import Link from 'next/link'
import { loginReadyFor } from '../../lib/auth'
import { AUTHENTICATE_ADMIN } from '../../data/admin'

const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({email: '', password: ''})
  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    callback()
  }
  const handleChange = (e) => {
    e.persist()
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  return {
    handleSubmit,
    handleChange,
    inputs
  }
}


const Login = ({ token }) => {
  const [login, {loading, data, error}] = useMutation(AUTHENTICATE_ADMIN)
  const {inputs, handleChange, handleSubmit} = useLoginForm(() => login({variables: inputs}))
  const [inputErrors, setInputErrors] = useState({});
  const [formIsInvalid, setFormIsInValid] = useState(false);


  useEffect(() => {

    setFormIsInValid(false);
    if (data && data.login.token) {
      loginReadyFor(data.login.token, {admin: true})
    }

    if (data && data.login["errors"] && data.login.errors.length) {
      setInputErrors(
        data.login.errors.reduce((errors, { path, message }) => {
          errors[path] = message;
          return errors;
        }, {})
      );

      setFormIsInValid(true);
    }
  }, [data]);

  return (
    <Container>
      {error &&
        <Message>{error.message}</Message>
      }
      {loading &&
        <Dimmer><Loader></Loader></Dimmer>
      }
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <Form size='large' onSubmit={handleSubmit} error={formIsInvalid}>
            <Segment>
              <Form.Input fluid icon='user' iconPosition='left'
                placeholder='E-mail address'
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                value={inputs.password}
                onChange={handleChange}
              />
              {formIsInvalid && (
                <Message error style={{ textAlign: "left" }}>
                  <ul>
                    {Object.values(inputErrors).map(err => (
                      <li>{err}</li>
                    ))}
                  </ul>
                </Message>
              )}
              <Button primary fluid size='large' type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
)}

export default Login