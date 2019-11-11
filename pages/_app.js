import App, { Container } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import * as Sentry from '@sentry/browser'
import '../.semantic/dist/semantic.min.css';
Sentry.init({dsn: "https://6d1c9e30c87a49c49440c9d2919ab738@sentry.io/1795555"});

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);