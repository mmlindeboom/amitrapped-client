import React from 'react';
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import { Button, Dimmer, Loader, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Container } from 'next/app';
import { loginReadyFor } from '../lib/auth'
import { SIGNUP_USER } from '../data/user'

const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({
                                    email: '',
                                    password: '',
                                    passwordConfirmation: '',
                                    firstName: '',
                                    lastName: ''
                                  })
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


const SignupForm = ({ token }) => {
  const [signup, {loading, data, error}] = useMutation(SIGNUP_USER)
  const {inputs, handleChange, handleSubmit} = useLoginForm(() => signup({variables: inputs}))

  if (data && data.signUp.token) {
    loginReadyFor(data.signUp.token, {welcomePage: true})
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
            Create an account
          </Header>

          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
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
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                name='passwordConfirmation'
                value={inputs.passwordConfirmation}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='address card outline'
                iconPosition='left'
                placeholder='First Name'
                name='firstName'
                value={inputs.firstName}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='address card outline'
                iconPosition='left'
                placeholder='Last Name'
                name='lastName'
                value={inputs.lastName}
                onChange={handleChange}
              />
              <Button color='teal' fluid size='large' type="submit">
                I'm ready to take the quiz!
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
)}

export default SignupForm