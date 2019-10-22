import React from 'react';
import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import { Button, Dimmer, Divider, Loader, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Container } from 'next/app';
import Link from 'next/link'
import { loginReadyFor } from '../lib/auth'
import { Router } from 'next/router';
import { AUTHENTICATE_USER } from '../data/user'

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
  const [login, {loading, data, error}] = useMutation(AUTHENTICATE_USER)
  const {inputs, handleChange, handleSubmit} = useLoginForm(() => login({variables: inputs}))

  if (data && data.login) {
    loginReadyFor(data.login.token)
  }

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
          <Header as='h2' color='teal' textAlign='center'>
            Log-in
          </Header>

          <Form size='large' onSubmit={handleSubmit}>
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

              <Button color='teal' fluid size='large' type="submit">
                Login
              </Button>
            </Segment>
            <Divider ></Divider>
            <p>or <Link href='/welcome'><a style={{textDecoration: 'underline'}}>Sign up</a></Link></p>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
)}

export default Login