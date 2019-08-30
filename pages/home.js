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
import Link from 'next/link'
import AppLayout from '../components/AppLayout'
import Steps from '../components/Steps'
import { withAuthSync } from '../lib/auth'
import { GET_USER } from '../data/user'

// TODO: Undo hardcoding of this number
const QUESTIONS_COUNT = 48
const Home = (props => {
  const {client, loading, error, data} = useQuery(GET_USER)

  let firstName = ''
  let toGo = 0

  if (error) {
    return <div>{error.message}</div>
  }
  if (loading) {
    return <AppLayout><Dimmer><Loader></Loader></Dimmer></AppLayout>
  }
  if (data && data.user) {
    firstName = data.user.firstName
    toGo =  parseInt((data.user.reply.completed/QUESTIONS_COUNT)*100)
  }

  return (
    <AppLayout client={client}>
      <Header size="huge">Let's start here, {firstName}</Header>

      <Grid celled="internally" relaxed>
        <Grid.Row stretched>
          <Grid.Column>
            <Header>The Plan</Header>
            <Steps toGo={toGo}></Steps>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column>
            <Header>What are the digital traps?</Header>
            <Segment>
                <Item.Group divided>
                  <Item>
                    <Item.Image size='mini' src='/static/forest.jpg' />
                    <Item.Content>
                      <Item.Header>Header</Item.Header>
                      <Item.Description>
                        Description
                      </Item.Description>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Image size='mini' src='/static/forest.jpg' />
                    <Item.Content>
                      <Item.Header>Header</Item.Header>
                      <Item.Description>
                        Description
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>

            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  )
})

export default withAuthSync(Home)