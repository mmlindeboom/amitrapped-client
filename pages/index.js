import React from 'react';
import Layout from '../components/Layout'
import Login from '../components/LoginForm'



export default (props) => {
  return (
    <div>
      <Layout>
        <Login token={props.token}></Login>
      </Layout>
    </div>
  )
};
