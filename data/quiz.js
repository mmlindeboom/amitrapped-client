import { gql } from 'apollo-boost'

export const GET_WELCOME = gql`
  query {
    welcome {
      header
      description
    }
  }
`

export const GET_QUIZ = gql`
  query {
    user {
      firstName
    }

    reply {
      token,
      complete,
      completed,
      quiz {
        intro
        placements {
          prompt
        }
      }
      answers {
        value
        id
        placement {
          prompt
        }
      }
    }
  }
`

export const UPDATE_ANSWER = gql`
  mutation updateAnswer($id: ID!, $value: Int!) {
    updateAnswer(id: $id, value: $value) {
      reply {
        token,
        complete,
        completed,
        answers {
          value
          id
          placement {
            prompt
          }
        }
      }
    }
  }
`