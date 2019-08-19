import { gql } from 'apollo-boost'

export const GET_USER = gql`
  query {
    user {
      firstName
    }
  }
`
export const AUTHENTICATE_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!, $firstName: String!, $lastName: String!) {
    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, firstName: $firstName, lastName: $lastName) {
      token
    }
  }
`