import React from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import Router from 'next/router'
import {
  Card,
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Rail,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { logout } from '../lib/auth'

const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`


export default function({ client, page, children }) {
  const [logOutUser] = useMutation(LOGOUT_USER)


  const handleLogout = () => {
    logOutUser()
    logout(client)
  }

  const gridStyles = {
    maxWidth: '1024px',
    margin: '0 auto'
  }

  return (
    <Container>
      <Head>
        <title>Am I Trapped?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      </Head>
      <Menu attached="top" color="teal" inverted>
        <Menu.Item onClick={() => Router.push('/')}>
          <Header inverted>
            <Image src="/static/logo.png" size="mini" style={{margin: 0}} />
            <Header.Content>Identify Your Traps</Header.Content>
          </Header>
        </Menu.Item>
        {page && <Menu.Item active><Icon name="angle right" style={{position: 'absolute', left: -8}}></Icon>{page}</Menu.Item>}
        <Menu.Menu position="right">
          <Dropdown item simple icon="setting">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => Router.push('/admin')}><Icon name="lock"></Icon>Admin</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}><Icon name="hand victory"></Icon>Logout</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Image size="medium" src="/static/journey.png"></Image>
      <Grid verticalAlign="middle" style={gridStyles}>
        <Grid.Column>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}