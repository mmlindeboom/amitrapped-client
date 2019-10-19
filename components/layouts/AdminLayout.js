

import React, { useState } from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import { Container as Card, Grid, Menu } from 'semantic-ui-react'
import Router from 'next/router'


export default function({ client, children }) {
  const [active, setActive] = useState('edit')

  const handleClick = (name) => {
    setActive(name)
    Router.push(`/admin/${name}`)
  }
  return (
    <Container>
      <Head>
        <title>AIT Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
      </Head>
      <Menu fixed='top' pointing fluid>
        <Menu.Item name='Admin' active={active === 'edit'} onClick={() => handleClick('edit')}></Menu.Item>
        <Menu.Item name='Dashboard' disabled></Menu.Item>
      </Menu>
      <Grid style={{ width: '1200px' }} padded verticalAlign='middle'>
        <Grid.Column>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}