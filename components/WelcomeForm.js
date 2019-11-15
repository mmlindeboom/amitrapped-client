import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_WELCOME } from '../data/quiz'
import {
  Segment,
  Grid,
  Header,
  Responsive,
} from "semantic-ui-react";
import SignupForm from './SignupForm'
import ParagraphLoader from './ParagraphLoader'
export default function({loading, header, description}) {
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