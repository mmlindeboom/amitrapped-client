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
        <link href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap" rel="stylesheet"></link>

      </Head>
      <style jsx>{`
        .logged-out {
          background-image: url('/static/trapsBackground-72.png');
          background-repeat: repeat;
          background-color: #fff;
          background-attachment: fixed;
        }
      `}</style>

      <div className="logged-out">
        <Card>
          {children}
        </Card>
      </div>
    </Container>
  )
}