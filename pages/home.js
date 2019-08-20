import { useQuery } from '@apollo/react-hooks'
import {
  Container as Card,
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Image,
  List,
  Loader,
  Menu,
  Responsive,
  Segment,
  Step,
  Rail,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import withData from '../lib/apollo'
import AppLayout from '../components/AppLayout'
import { withAuthSync } from '../lib/auth'
import { GET_USER } from '../data/user'


const Home = (props => {
  const {client, loading, error, data: { user } } = useQuery(GET_USER)

  let firstName = ''

  if (loading) {
    return <AppLayout><Dimmer><Loader></Loader></Dimmer></AppLayout>
  }
  if (user) firstName = user.firstName

  return (
    <AppLayout client={client}>
      <Header size="huge">Let's start here, {firstName}</Header>
      <Header>The Plan</Header>
      <Step.Group>
        <Step link>
          <Icon name='mail' />
          <Step.Content>
            <Step.Title>Quiz</Step.Title>
            <Step.Description>Take your quiz</Step.Description>
          </Step.Content>
        </Step>

        <Step link disabled>
          <Icon name='eye' />
          <Step.Content>
            <Step.Title>Review your traps</Step.Title>
            <Step.Description>Your traps will tell you the future</Step.Description>
          </Step.Content>
        </Step>

        <Step link disabled>
          <Icon name='heart' />
          <Step.Content>
            <Step.Title>Take action</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>

      <Header>What you can do right now</Header>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src='/static/forest.jpg' />

            <Item.Content>
              <Item.Header as='a'>Take your quiz!</Item.Header>
              <Item.Meta>It's the next step</Item.Meta>
              <Item.Description>
                Lorem ipsum
              </Item.Description>
              <Item.Extra>
                <Button primary floated='right'>
                   Take Quiz
                  <Icon name='right chevron' />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

    </AppLayout>
  )
})

export default withAuthSync(withData(Home))