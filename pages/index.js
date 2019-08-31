import React from 'react';
import Layout from '../components/Layout'
import Login from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import {
  Segment,
  Grid,
  Divider,
  Responsive
} from 'semantic-ui-react'

export default (props) => {
  console.log(Responsive.onlyLargeScreen)
  return (
    <div>
      <Layout>
        <Grid verticalAlign="middle" style={{ height: '100vh' }}>
          <Grid.Column>
            <Segment basic>
              <Grid columns={2} stackable>
                <Grid.Column verticalAlign="middle">
                  <Login></Login>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <SignupForm></SignupForm>
                </Grid.Column>
              </Grid>
              <Responsive as={Divider} vertical {...Responsive.onlyComputer}>OR</Responsive>
              <Responsive as={Divider} {...Responsive.onlyMobile}>OR</Responsive>
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout>
    </div>
  )
};
