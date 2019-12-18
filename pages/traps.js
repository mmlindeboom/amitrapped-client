import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { USER_TRAPS } from '../data/user'
import Link from 'next/link'
import {
  Button,
  Breadcrumb,
  Container,
  Dimmer,
  Header,
  Icon,
  Message,
  Loader,
  Grid,
  Segment
} from 'semantic-ui-react'
import AppLayout from '../components/AppLayout'
import TrapCard from '../components/TrapCard'
import { GET_USER, UPDATE_USER_HAS_REVIEWED_TRAPS } from '../data/user'
import Visible from '../components/Visible'
const isolateStep = (array, step) => {
  const clonedArray = array

  if (step === 0 && clonedArray.length) return [clonedArray[0]]
  if (step < 0) return []

  return clonedArray.slice(step, step+1)
}

const Traps = (({client}) => {
  const {data: {userTraps, user}, loading}= useQuery(USER_TRAPS)
  const [updateUserReviewedTraps] = useMutation(UPDATE_USER_HAS_REVIEWED_TRAPS, {
    refetchQueries: [{query: GET_USER }]
  })

  const [showMessage, setShowMessage] = useState(true)
  useEffect(() => {
    if (user && !user.reviewedTraps) {
      updateUserReviewedTraps()
    }
  }, [user])
  return (
    <AppLayout client={client} page='Traps'>
      <Grid relaxed style={{maxWidth: 800}}>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link href="/"><a>Home</a></Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Traps Review</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Message info>
                <p>{user && user.firstName? `Hello ${user.firstName}` : 'Hello'}! Below are your most common screen traps (ranked from most to least).</p>
                <p>Remember, the results of this quiz are meant to
                empower you with knowledge of the destructive habit loops
                that have been running on autopilot outside of your awareness, until today!
                Now that you know what to lookout for, these unwanted screen habits can never happen
                again without you recognizing that they’re happening.</p>
                <p>I invite you to review your results below and familiarize yourself with all 10 screen
                  traps so you can become vigilant of when they’ve hijacked the steering wheel on your
                  digital behavior, and that of those you care about!</p>

                <p>Once we’re aware of our habit loops we can get curious about them:
                  “Why am I doing this? What triggered the behavior?
                  What reward am I really getting from this? Do I want to keep doing this?”
                  On the next page, you’ll find the tools you need to answer these questions and change
                  your digital behavior for good.</p>
              </Message>
          </Grid.Column>
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
          <Grid.Column>
            {userTraps && userTraps.length >= 1 && (
                <div>
                  {loading && <Dimmer><Loader></Loader></Dimmer>}
                  {userTraps && userTraps.map((trap, idx) => <TrapCard isVisible={true} key={idx} {...trap}></TrapCard>)}
                </div>
              )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  )
})

export default withAuthSync(Traps)