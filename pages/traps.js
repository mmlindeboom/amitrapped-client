import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { USER_TRAPS } from '../data/user'
import Link from 'next/link'
import {
  Button,
  Breadcrumb,
  Dimmer,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Loader,
  Grid,
  Segment
} from 'semantic-ui-react'
import AppLayout from '../components/AppLayout'
import TrapCard from '../components/TrapCard'

const isolateStep = (array, step) => {
  const clonedArray = array

  if (step === 0 && clonedArray.length) return [clonedArray[0]]
  if (step < 0) return []

  return clonedArray.slice(step, step+1)
}

const Traps = (({client}) => {
  const {data: {userTraps}, loading}= useQuery(USER_TRAPS)
  return (
    <AppLayout client={client} page='Traps'>
      <Grid relaxed>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link href="/home"><a>Home</a></Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Traps Review</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>

            {userTraps && !userTraps.length && (
              <Segment placeholder>
                <Header icon>
                  <Icon name='coffee'></Icon>
                  Whoops! We couldn't find any traps for you.
                  <Header.Subheader>But, we're hard at work fixing the problem!</Header.Subheader>
                </Header>
                <Button primary>Get in touch with us</Button>
              </Segment>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            {userTraps && userTraps.length > 1 && (
                <div>
                  {loading && <Dimmer><Loader></Loader></Dimmer>}
                  {userTraps && userTraps.map((trap, idx) => <TrapCard name={trap.name} description={trap.description} isVisible={true} key={idx}></TrapCard>)}
                </div>
              )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  )
})

export default withAuthSync(Traps)