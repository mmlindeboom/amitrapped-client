import React from 'react';
import withData from '../lib/apollo'
import Layout from '../components/Layout'
import SignupForm from '../components/SignupForm'



export default withData(props => {
  return (
    <div>
      <Layout>
        <SignupForm></SignupForm>
      </Layout>
    </div>
  )
});
