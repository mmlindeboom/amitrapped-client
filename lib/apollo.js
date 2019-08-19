import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { setContext } from 'apollo-link-context'
import { getToken } from './auth'


const authLink = setContext((_, {cache}) => {
  let token = getToken()

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:3001/graphql", // Server URL (must be absolute)
  cors: {
    origin: 'http://127.0.0.1:3000',
    credentials: true
  }
})

export default withData(() => {
  return {
    link: authLink.concat(httpLink)
  }
})