import React, { useEffect, useState} from 'react';
import { useMutation } from '@apollo/react-hooks'
import { Button, Dimmer, Divider, Loader, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Container } from 'next/app';
import Link from 'next/link'
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
  const [inputErrors, setInputErrors] = useState({})
  const [formIsInvalid, setFormIsInValid] = useState(false)

  useEffect(() => {
    setFormIsInValid(false)
    if (data && data.signUp.token) {
      loginReadyFor(data.signUp.token, {welcomePage: true})
    }

    if (data && data.signUp['errors'] && data.signUp.errors.length) {
      setInputErrors(data.signUp.errors.reduce((errors, {path, message}) => {
        errors[path] = message;
        return errors;
      }, {}))

      setFormIsInValid(true)
    }
  }, [data])


  return (
    <Container>
      {error &&
        <Message>{error.message}</Message>
      }
      {loading &&
        <Dimmer><Loader></Loader></Dimmer>
      }
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450}}>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment>
              <Form.Input fluid icon='user' iconPosition='left'
                placeholder='E-mail address'
                error={'email' in inputErrors}
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
                error={'password' in inputErrors}
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
                error={'passwordConfirmation' in inputErrors}
                value={inputs.passwordConfirmation}
                onChange={handleChange}
              />
              {formIsInvalid && (<Message color="yellow" style={{textAlign: 'left'}}>
                <ul>{Object.values(inputErrors).map(err => <li>{err}</li>)}</ul>
              </Message>)}
              <Button primary fluid size='large' type="submit">
                I'm ready to take the quiz!
              </Button>
            </Segment>
            <Divider ></Divider>
            <p>or <Link href='/login'><a style={{textDecoration: 'underline'}}>Login</a></Link></p>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
)}

export default SignupForm