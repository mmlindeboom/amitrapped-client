import { gql } from 'apollo-boost'

export const GET_PLACEMENTS = gql`
  query {
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