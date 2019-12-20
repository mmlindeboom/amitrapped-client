import { gql } from "apollo-boost";

export const AUTHENTICATE_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      errors {
        path
        message
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      email
      firstName
      reply {
        complete
      }
    }
  }
`
export const ADMIN_QUERY = gql`
  query {
    activeQuiz {
      id
      intro
      userLimit
      disableSignup
    }
    traps {
      id
      name
      description
      imageUrl
      pillar {
        name
      }
      questions {
        id
        prompt
      }
    }
    welcome {
      header
      description
    }

    services {
      id
      tag
      title
      body
    }
  }
`;
export const GET_QUESTIONS = gql`
  query {
    questions {
      id
      prompt
      trap {
        name
      }
    }
  }
`;

export const UPDATE_USER_LIMIT = gql`
  mutation updateUserLimit($id: ID!, $limit: Int!) {
    updateUserLimit(id: $id, limit: $limit) {
      userLimit
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($id: ID!, $prompt: String!) {
    updateQuestion(id: $id, prompt: $prompt) {
      prompt
    }
  }
`;
export const UPDATE_TRAP = gql`
  mutation updateTrap($id: ID!, $name: String!, $description: String!) {
    updateTrap(id: $id, name: $name, description: $description) {
      name
      description
    }
  }
`;

export const UPDATE_QUIZ = gql`
  mutation updateQuiz(
    $id: ID!
    $intro: String
  ) {
    updateQuiz(
      id: $id
      intro: $intro
    ) {
      id
      intro
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation createService(
    $title: String!
    $body: String!
    $tag: String!
  ) {
    createService(
      title: $title
      body: $body
      tag: $tag
    ) {
      id
      tag
      title
      body
    }
  }
`
export const UPDATE_SERVICE = gql`
  mutation updateService(
    $id: ID!
    $title: String!
    $body: String!
  ) {
    updateService(
      id: $id
      title: $title
      body: $body

    ) {
      id
      title
      body
    }
  }
`
export const UPDATE_SIGNUP_MESSAGES = gql`
  mutation updateSignupMessages(
    $id: ID!
    $header: String!
    $description: String!
  ) {
    updateSignupMessages(
      id: $id
      header: $header
      description: $description
    ) {
      header
      description
    }
  }
`

export const ATTACH_TRAP_IMAGE_MUTATION = gql`
  mutation attachTrapImageMutation($id: ID!, $blobId: String!) {
    attachTrapImage(id: $id, blobId: $blobId) {
      trap {
        imageUrl
      }
    }
  }
`;
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
