import React, { useState } from "react";
import Head from "next/head";
import { Container } from "next/app";
import Router from "next/router";
import {
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { logout, isAuthenticated } from "../lib/auth";

const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;

export default function({ client, page, children }) {
  const [logOutUser] = useMutation(LOGOUT_USER);
  const [windowWidth, setWindowWidth] = useState(0);
  const [authenticated] = useState(isAuthenticated());
  const handleLogout = () => {
    logOutUser();
    logout(client);
  };

  const gridStyles = {
    maxWidth: "1024px",
    margin:
      Responsive.onlyTablet.minWidth <= windowWidth
        ? "140px auto 0 auto"
        : "24px auto 0 auto",
  };

  return (
    <Container>
      <Head>
        <title>The Digital Behaviorist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Menu attached="top" color="darkGrey">
        <Menu.Item onClick={() => Router.push("/")}>
          <Header>
            <Header.Content>Your Digital Health</Header.Content>
          </Header>
        </Menu.Item>

        {page && (
          <Menu.Item active>
            <Icon
              name="angle right"
              color="orange"
              style={{ position: "absolute", left: -8 }}
            ></Icon>
            {page}
          </Menu.Item>
        )}
        {authenticated && (
          <Menu.Menu position="right" color="orange">
            <Dropdown item simple icon="setting" color="orange">
              <Dropdown.Menu color="darkGrey">
                <Dropdown.Item onClick={handleLogout}>
                  <Icon name="hand victory" color="orange"></Icon>Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
      </Menu>

      <Responsive
        fireOnMount
        onUpdate={(e, { width }) => setWindowWidth(width)}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Image
          size="large"
          src="/static/journey.png"
          style={{ position: "absolute", left: 0, top: 60 }}
        ></Image>
      </Responsive>
      <Grid verticalAlign="middle" style={gridStyles}>
        <Grid.Column>{children}</Grid.Column>
      </Grid>
    </Container>
  );
}
