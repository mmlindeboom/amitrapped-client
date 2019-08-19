import React from 'react';
import withData from '../lib/apollo'
import Layout from '../components/Layout'
import Login from '../components/LoginForm'



export default withData(props => {
  return (
    <div>
      <Layout>
        <Login token={props.token}></Login>
      </Layout>
    </div>
  )
});
