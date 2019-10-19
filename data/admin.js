import { gql } from 'apollo-boost'

export const UPDATE_TRAP = gql`
  mutation updateTrap($id: ID!, $name: String!, $description: String!) {
    updateTrap(id: $id, name: $name, description: $description) {
      name
      description
    }
  }`

  export const UPDATE_QUIZ = gql`
  mutation updateQuiz($id: ID!, $intro: String!) {
    updateQuiz(id: $id, intro: $intro) {
      id
      intro
    }
  }`