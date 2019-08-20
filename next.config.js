const { parsed: localEnv } = require('dotenv').config()
const config =  { // Will be available on both server and client
  apiURL: localEnv.API_HOST,
  clientURL: localEnv.CLIENT_HOST
}
module.exports = {
  serverRuntimeConfig: config,
  publicRuntimeConfig: config
}