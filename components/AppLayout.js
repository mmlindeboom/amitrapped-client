import React from 'react';
import Head from 'next/head'
import { Container } from 'next/app'
import {
  Container as Card,
  Button,
  Divider,
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


export default function({ children }) {
  const [logOutUser, {loggedOut}] = useMutation(LOGOUT_USER)

  const handleLogout = () => {
    logOutUser()
    logout()
  }
  if (loggedOut) console.log('loggedOut')

  const gridStyles = {
    maxWidth: '1280px',
    height: '100vh',
    margin: 'auto'
  }
  return (
    <Container>
      <Head>
        <title>Am I Trapped?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <Grid verticalAlign="middle" style={gridStyles} celled='internally' relaxed>
        <Grid.Row>
          <Grid.Column width={4}>
            <div>
              <Image src="/static/forest.jpg" size="small" centered circular></Image>
              <Divider></Divider>
              <Menu text vertical>
                <Menu.Item header>Home</Menu.Item>
                <Menu.Item><a onClick={handleLogout}>Log out</a></Menu.Item>
                <Menu.Item header>Info</Menu.Item>
                <Menu.Item>Knowledge Base</Menu.Item>
              </Menu>
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}