import React, {useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks'
import Layout from "../components/Layout";
import WelcomeForm from "../components/WelcomeForm";
import { GET_WELCOME } from '../data/quiz'

import {
  Grid
} from "semantic-ui-react";

export default ({ client }) => {
  const {data, loading} = useQuery(GET_WELCOME)
  const [welcomeState, setWelcomeState] = useState({header: 'Your digital health is important.', details: "Which is why the results of your digital wellness test are yours. We'll only ever ask you for an email to send you results, and a password to secure them in case you want to come back."})

  useEffect(() => {
    if (data && data.welcome) setWelcomeState({
      header: data.welcome.header,
      description: data.welcome.description
    })
  }, [data])
  return (
    <Layout>
      <Grid verticalAlign="middle" style={{ height: "100vh" }}>
        <Grid.Column>
          <Grid>
            <Grid.Column verticalAlign="middle">
              <WelcomeForm loading={loading} {...welcomeState} />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};
