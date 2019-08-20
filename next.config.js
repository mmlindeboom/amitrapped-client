const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    apiURL: localEnv.API_HOST,
    clientURL: localEnv.CLIENT_HOST
  }
}