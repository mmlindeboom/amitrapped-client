import { gql } from 'apollo-boost'

export const GET_WELCOME = gql`
  query {
    activeQuiz {
      disableSignup
    }

    welcome {
      header
      description
    }
  }
`

export const GET_SERVICES = gql`
  query {
    services {
      title,
      body,
      tag
    }
  }
`
export const GET_QUIZ = gql`
  query {
    user {
      firstName
      admin
      reviewedTraps
    }

    reply {
      token,
      complete,
      completed,
      percentComplete
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
        percentComplete,
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