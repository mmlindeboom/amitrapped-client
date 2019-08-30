import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from "apollo-boost";
import withApollo from 'next-with-apollo'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { getToken } from './auth'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

const API_HOST = publicRuntimeConfig ? publicRuntimeConfig.apiURL : serverRuntimeConfig.apiURL
const CLIENT_HOST = publicRuntimeConfig ? publicRuntimeConfig.clientURL : serverRuntimeConfig.clientURL

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

export default withApollo(({ctx, headers, initialState}) =>
  new ApolloClient({
    ssr: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: true
  })
)