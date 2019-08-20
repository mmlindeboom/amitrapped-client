import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { setContext } from 'apollo-link-context'
import { getToken } from './auth'

const API_HOST = `${process.env.API_HOST}/graphql`
const CLIENT_HOST = process.env.CLIENT_HOST

const authLink = setContext((_, {cache}) => {
  let token = getToken()

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: API_HOST, // Server URL (must be absolute)
  cors: {
    origin: CLIENT_HOST,
    credentials: true
  }
})

export default withData(() => {
  return {
    link: authLink.concat(httpLink)
  }
})