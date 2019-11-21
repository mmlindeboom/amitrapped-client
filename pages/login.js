import React from 'react';
import Layout from '../components/Layout'
import Login from '../components/LoginForm'

import {
  Segment,
  Grid
} from 'semantic-ui-react'

export default ({client}) => {
  return (
    <Layout>
      <Grid verticalAlign="middle" style={{ height: '100vh' }}>
        <Grid.Column>
          <Segment basic>
            <Grid stackable>
              <Grid.Column verticalAlign="middle">
                <Segment stacked style={{maxWidth: 450, margin: '0 auto'}}>
                  <Login></Login>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Layout>
  )
};
