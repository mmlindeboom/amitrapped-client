import React from 'react';
import Layout from '../../components/Layout'
import Login from '../../components/admin/LoginForm'
import {
  Segment,
  Grid,
  Divider,
} from 'semantic-ui-react'
import { AUTHENTICATE_ADMIN } from '../../data/admin';

export default ({client}) => {
  return (
    <Layout>
      <Grid verticalAlign="middle" style={{ height: '100vh' }}>
        <Grid.Column>
          <Segment basic>
            <Grid stackable>
              <Grid.Column verticalAlign="middle">
                <Segment stacked style={{maxWidth: 450, margin: '0 auto'}}>
                  <Login query={AUTHENTICATE_ADMIN}></Login>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Layout>
  )
};
