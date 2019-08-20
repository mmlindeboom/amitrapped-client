const { parsed: localEnv } = require('dotenv').config()
const config =  { // Will be available on both server and client
  apiURL: localEnv ? localEnv.API_HOST : process.env.API_HOST,
  clientURL: localEnv ? localEnv.CLIENT_HOST : process.env.CLIENT_HOST
}

module.exports = {
  serverRuntimeConfig: config,
  publicRuntimeConfig: config
}