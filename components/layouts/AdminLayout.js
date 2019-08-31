

import React from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import { Grid, Breadcrumb, Rail, Menu } from 'semantic-ui-react'
import Link from 'next/link'

export default function({ name, children }) {
  return (
    <Container>
      <Head>
        <title>AIT Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <Grid style={{ height: '100vh', width: '100%' }} padded verticalAlign='middle'>
        <Grid.Column width={3} stretched>
          <Menu fluid vertical tabular>
            <Menu.Item name='Dashboard' active></Menu.Item>
            <Menu.Item name='Questions'></Menu.Item>
            <Menu.Item name='Traps'></Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={13}>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}