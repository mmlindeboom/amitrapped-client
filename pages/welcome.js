import React from "react";
import Layout from "../components/Layout";
import Login from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {
  Card,
  Segment,
  Grid,
  Image,
  Header,
  Divider,
  Responsive
} from "semantic-ui-react";

export default ({ client }) => {
  return (
    <Layout>
      <Grid verticalAlign="middle" style={{ height: "100vh" }}>
        <Grid.Column>
          <Grid>
            <Grid.Column verticalAlign="middle">
              <Segment stacked style={{ maxWidth: 800, margin: "0 auto" }}>
                <Grid columns="equal" stackable>
                  <Grid.Column verticalAlign="middle">
                    <Responsive as={Segment} basic minWidth={Responsive.onlyTablet.minWidth}>
                      <Header as="h1" color="teal">
                        Your digital health is important.
                      </Header>
                      <Header as="h4" color="darkgrey">
                        Which is why the results of your digital wellness test
                        are yours. We'll only ever ask you for an email to send
                        you results, and a password to secure them in case you
                        want to come back.
                      </Header>
                    </Responsive>

                    <Responsive as={Header} color="teal" textAlign="center" {...Responsive.onlyMobile}>
                        <h3>
                          Your Digital Health is important
                        <Header.Subheader style={{marginTop: 8, padding: '0 10px'}}>We'll only ever ask you for an email to send
                        you results, and a password to secure them in case you
                        want to come back.</Header.Subheader>
                        </h3>
                    </Responsive>
                  </Grid.Column>

                  <Grid.Column>
                    <SignupForm></SignupForm>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};
