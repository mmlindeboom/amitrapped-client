

import React, { useState } from 'react';
import { useMutation} from '@apollo/react-hooks'
import Head from 'next/head'
import { gql } from 'apollo-boost'
import { Container } from 'next/app'
import { Container as Card, Dropdown, Icon, Grid, Menu } from 'semantic-ui-react'
import Router from 'next/router'
import { logout } from '../../lib/auth'

const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`

export default function({ client, children }) {
  const [active, setActive] = useState('edit')
  const [logOutUser] = useMutation(LOGOUT_USER)

  const handleLogout = () => {
    logOutUser()
    logout(client)
  }

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
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
        <link href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap" rel="stylesheet"></link>
      </Head>
      <Menu fixed='top' pointing fluid>
        <Menu.Item name='Admin' active={active === 'edit'} onClick={() => handleClick('edit')}></Menu.Item>
        <Menu.Item name='Dashboard' disabled></Menu.Item>
        <Menu.Menu position="right" color="orange">
          <Dropdown item simple icon="setting" color='orange'>
            <Dropdown.Menu color='darkGrey'>
              <Dropdown.Item onClick={handleLogout}><Icon name="hand victory" color="orange"></Icon>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Grid style={{ width: '1200px' }} padded verticalAlign='middle'>
        <Grid.Column>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}