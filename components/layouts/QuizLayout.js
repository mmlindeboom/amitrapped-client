

import React from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import { Grid, Breadcrumb, Image } from 'semantic-ui-react'
import Link from 'next/link'

export default function({ name, children }) {
  return (
    <Container>
      <Head>
        <title>Am I Trapped?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap" rel="stylesheet"></link>
      </Head>
      <Image src="/static/journey.png" size="large" style={{position: 'absolute', left: 0, top: 0}}></Image>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 800}} textAlign="left">
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link href="/"><a>{name || 'Home'}</a></Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Quiz</Breadcrumb.Section>
          </Breadcrumb>

          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}