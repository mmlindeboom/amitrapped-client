import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Icon,
  Item,
  Loader,
  Segment
} from 'semantic-ui-react'
import { withAuthSync } from '../lib/auth'
import { GET_USER } from '../data/user'
import todos from '../data/todos'
import AppLayout from '../components/AppLayout'
import Steps from '../components/Steps'

// TODO: Undo hardcoding of this number
const QUESTIONS_COUNT = 31
const Home = (({client}) => {
  const {loading, error, data} = useQuery(GET_USER)
  const [userState, setUserState] = useState({name: '', percentComplete: 0})
  const [todo, setTodo] = useState(todos['incomplete'])

  if (error) {
    return <div>{error.message}</div>
  }

  useEffect(() => {
    if (data && data.user) {
      let percent = parseInt((data.user.reply.completed/QUESTIONS_COUNT)*100)
      let status = percent < 100 ? 'incomplete' : 'complete'
      setUserState({
        name: data.user.firstName,
        percentComplete: percent
      })
      setTodo(todos[status])
    }
  }, [data])

  return (
    <AppLayout client={client}>
      <Header size="huge">Let's start here, {userState.name}</Header>

      <Grid celled="internally" relaxed>
        {loading && <Dimmer active inverted><Loader></Loader></Dimmer>}
        <Grid.Row stretched>
          <Grid.Column>
            <Header>The Plan</Header>
            <Steps percentComplete={userState.percentComplete}></Steps>
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
                    <Item.Header as='a'>{todo.header}</Item.Header>
                    <Item.Meta>{todo.meta}</Item.Meta>
                    <Item.Description>
                      {todo.description}
                    </Item.Description>
                    <Item.Extra>
                      <Button primary floated='right' onClick={() => Router.push(todo.url)}>
                        {todo.cta}
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