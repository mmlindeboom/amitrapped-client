const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    apiURL: localEnv.API_URL,
    clientURL: localEnv.CLIENT_URL
  }
}