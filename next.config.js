const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');

const { parsed: localEnv } = require('dotenv').config()
const config =  { // Will be available on both server and client
  apiURL: localEnv ? localEnv.API_HOST : process.env.API_HOST,
  clientURL: localEnv ? localEnv.CLIENT_HOST : process.env.CLIENT_HOST
}

module.exports = withPlugins([[css]], {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
  serverRuntimeConfig: config,
  publicRuntimeConfig: config
})