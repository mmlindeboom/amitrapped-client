import { gql } from 'apollo-boost'

export const ADMIN_QUERY = gql`
  query {
    traps {
      id
      name
      description
      imageUrl
      pillar {
        name
      }
    }
    quiz {
      id
      intro
    }
  }
`
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

  export const ATTACH_TRAP_IMAGE_MUTATION = gql`
    mutation attachTrapImageMutation(
      $id: ID!
      $blobId: String!
    ) {
      attachTrapImage(
        id: $id
        blobId: $blobId
      ) {
        trap {
          imageUrl
        }
      }
    }
  `
  export const CREATE_DIRECT_UPLOAD_MUTATION = gql`
    mutation createDirectUploadMutation(
      $filename: String!
      $checksum: String!
      $byteSize: Int!
      $contentType: String!
    ) {
      createDirectUpload(
        input: {
          checksum: $checksum
          filename: $filename
          byteSize: $byteSize
          contentType: $contentType
        }
      ) {
        directUpload {
          blobId
          headers
          signedBlobId
          url
        }
      }
    }
  `;