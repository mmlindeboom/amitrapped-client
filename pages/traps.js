import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { USER_TRAPS } from '../data/user'
import Link from 'next/link'
import {
  Button,
  Breadcrumb,
  Dimmer,
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
  const [step, setStep] = useState(0)

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
            {userTraps && userTraps.length > 1 && (
                <List horizontal>
                  {userTraps.map((_, i) => (
                    <List.Item onClick={() => setStep(i)} key={i}>
                      <List.Content><Label as='a' circular color={step === i ? 'teal' : 'grey'}>{i+1}</Label></List.Content>
                    </List.Item>
                  ))}
                </List>
              )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            {loading && <Dimmer><Loader></Loader></Dimmer>}
            {userTraps && isolateStep(userTraps, step).map((trap) => (
                <div>
                  <TrapCard name={trap.name} description={trap.description} isVisible={true} key={Math.random()}></TrapCard>
                  {step > 0 && <Button onClick={() => setStep((step - 1) || 0)}>Prev</Button>}
                  {step + 1 < userTraps.length && <Button onClick={() => setStep(step + 1)} primary>Next</Button>}
              </div> ))}

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  )
})

export default withAuthSync(Traps)