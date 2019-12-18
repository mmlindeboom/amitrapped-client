import { gql } from 'apollo-boost'

export const GET_USER = gql`
  query {
    user {
      firstName
      admin
      reviewedTraps
      reply {
        token
        completed
        percentComplete
        quiz {
          intro
        }
      }
    }
  }
`

export const USER_TRAPS = gql`
  query {
    user {
      reviewedTraps
    }
    userTraps {
      id
      name
      description
      score
      imageUrl
      pillar {
        name
      }
      questions {
        id
        prompt
      }
    }
  }
`
export const AUTHENTICATE_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      errors {
        path
        message
      }
    }
  }
`
export const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      token
      errors {
        path
        message
      }
    }
  }
`

export const UPDATE_USER_HAS_REVIEWED_TRAPS = gql`
  mutation updateTrapsReviewed {
    updateTrapsReviewed {
      reviewedTraps
    }
  }
`