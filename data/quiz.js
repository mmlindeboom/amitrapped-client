import { gql } from 'apollo-boost'

export const GET_PLACEMENTS = gql`
  query getPlacements {
    placements($id) {
      prompt
      [choice]
    }
  }
`