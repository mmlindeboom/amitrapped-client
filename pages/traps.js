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
  const [step, setStep] = useState(0)
  const [orientation, setOrientation] = useState('horizontal')
  const trapLabelSize = (index) => {
    switch(index) {
      case 0:
        return 'massive'
      case 1:
        return 'huge'
      case 2:
        return 'big'
      case 3:
        return 'large'
      case 4:
        return 'medium'
      default:
        return 'small'
      }
  }
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
            <Segment basic>
                <Grid verticalAlign="middle">
                  {userTraps && userTraps.length > 1 && orientation === 'horizontal' && (
                    <Grid.Column width="7">
                      <List horizontal>
                        {userTraps.map((_, i) => (
                          <List.Item onClick={() => setStep(i)} key={i}>
                            <List.Content><Label as='a' circular color={step === i ? 'teal' : 'grey'}>{i+1}</Label></List.Content>
                          </List.Item>
                        ))}
                      </List>

                    </Grid.Column>
                    )}
                  <Grid.Column width="9">
                    <List horizontal divided>
                      <List.Item><Button size="tiny" onClick={()=> setStep(0)}>Biggest Trap</Button></List.Item>
                      <List.Item><Button size="tiny" onClick={()=> setStep(userTraps.length-1)}>Smallest Trap</Button></List.Item>
                      <List.Item><Button size="tiny" icon="share"></Button></List.Item>
                    </List>
                  </Grid.Column>
                </Grid>
            </Segment>


          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            {orientation === 'vertical' &&
              <Grid relaxed style={{height: 520}}>
                <Grid.Column verticalAlign="middle" width="2" textAlign="center">
                {userTraps && userTraps.length > 1 && (
                  <List>
                    {userTraps.map((_, i) => (
                      <List.Item onClick={() => setStep(i)} key={i}>
                        <List.Content><Label as='a' circular size={trapLabelSize(i)} color={step === i ? 'teal' : 'grey'}>{i+1}</Label></List.Content>
                      </List.Item>
                    ))}
                  </List>
                )}
                </Grid.Column>
                <Grid.Column width="1"></Grid.Column>
                <Grid.Column width="13" verticalAlign="middle">
                  {loading && <Dimmer><Loader></Loader></Dimmer>}
                  {userTraps && isolateStep(userTraps, step).map((trap) => (
                      <div>
                        <TrapCard name={trap.name} description={trap.description} isVisible={true} key={Math.random()}></TrapCard>
                        {step > 0 && <Button onClick={() => setStep((step - 1) || 0)}>Prev</Button>}
                        {step + 1 < userTraps.length && <Button onClick={() => setStep(step + 1)} primary>Next</Button>}
                    </div> ))}
                </Grid.Column>
              </Grid>
            }

            {orientation === 'horizontal' && userTraps && userTraps.length > 1 && (
                <div>
                  {loading && <Dimmer><Loader></Loader></Dimmer>}
                  {userTraps && isolateStep(userTraps, step).map((trap) => (
                      <div>
                        <TrapCard name={trap.name} description={trap.description} isVisible={true} key={Math.random()}></TrapCard>
                        {step > 0 && <Button onClick={() => setStep((step - 1) || 0)}>Prev</Button>}
                        {step + 1 < userTraps.length && <Button onClick={() => setStep(step + 1)} primary>Next</Button>}
                    </div> ))}
                </div>
              )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <List horizontal divided style={{position: 'fixed', bottom: 0}}>
        <List.Item>UI Options: </List.Item>
        <List.Item as='a' onClick={()=> setOrientation('vertical')} disabled={orientation==='vertical'}>Vertical</List.Item>
        <List.Item as='a'onClick={()=> setOrientation('horizontal')} disabled={orientation==='horizontal'}>Horizontal</List.Item>
      </List>
    </AppLayout>
  )
})

export default withAuthSync(Traps)