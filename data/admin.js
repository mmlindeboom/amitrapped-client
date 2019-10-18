import { gql } from 'apollo-boost'

export const UPDATE_TRAP = gql`
  mutation updateTrap($id: ID!, $name: String!, $description: String!) {
    updateTrap(id: $id, name: $name, description: $description) {
      name
      description
    }
  }`