import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_WELCOME } from '../data/quiz'
import {
  Divider,
  Segment,
  Grid,
  Header,
  Responsive
} from "semantic-ui-react";
import SignupForm from './SignupForm'
import ParagraphLoader from './ParagraphLoader'
import Link from 'next/link'
export default function({ disableSignup, loading, header, description}) {

  if (disableSignup) {
    return(
      <Segment textAlign="center" stacked style={{ maxWidth: 450, margin: "0 auto" }}>
        <Grid>
          <Grid.Column verticalAlign="middle">
            <Header as="h1" color="teal">We're at capacity!</Header>
            <Header as="h4" color="darkgrey">
              We're in Beta, so we have limited capacity. Stay tuned.
              Please reach out and let's see if we can get you set up.
              There's just two of us so please be patient! :) <a href="mailto:samantha@thedigitalbehaviorist.com">Email here</a>
            </Header>
            <Divider></Divider>
            <p>
              or{" "}
              <Link href="/login">
                <a style={{ textDecoration: "underline" }}>Login</a>
              </Link>
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
  return (
    <Segment stacked style={{ maxWidth: 800, margin: "0 auto" }}>
      <Grid columns="equal" stackable>
        <Grid.Column verticalAlign="middle">
          <Responsive
            as={Segment}
            basic
            minWidth={Responsive.onlyTablet.minWidth}
          >
            {loading && <ParagraphLoader />}

            {!loading &&
              <div>
                <Header as="h1" color="teal">
                  {header}
                </Header>
                <Header color="darkgrey">
                  <h4 dangerouslySetInnerHTML={{ __html: description }}></h4>
                </Header>
              </div>
            }
          </Responsive>

          <Responsive
            as={Header}
            color="teal"
            textAlign="center"
            {...Responsive.onlyMobile}
          >
            <h3>
              {header}
              <Header.Subheader
                style={{ marginTop: 8, padding: "0 10px" }}
              >
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </Header.Subheader>
            </h3>
          </Responsive>
        </Grid.Column>

        <Grid.Column>
          <SignupForm></SignupForm>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}