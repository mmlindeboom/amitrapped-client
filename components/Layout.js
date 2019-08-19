import React from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import { Container as Card } from 'semantic-ui-react'

export default function({ children }) {
  return (
    <Container>
      <Head>
        <title>Am I Trapped?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <Card>
        {children}
      </Card>
    </Container>
  )
}