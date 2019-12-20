import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Button,
  Message,
  Item,
  Segment,
  Form,
  Loader,
  List
} from 'semantic-ui-react'
import { USERS_QUERY, UPDATE_USER_LIMIT } from '../../data/admin'
export default function({quiz}) {
  const {data} = useQuery(USERS_QUERY)
  const [updateUserLimit] = useMutation(UPDATE_USER_LIMIT)

  const [users, setUsers] = useState([])
  const [userLimit, setUserLimit] = useState(null)
  const [currentUsers, setCurrentUsers] = useState(0)
  const [limitUpdating, setLimitUpdating] = useState(false)

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users)
      setCurrentUsers(data.users.length)
    }
  }, [data])

  useEffect(() => {

    setUserLimit(quiz && quiz.userLimit || 0)
  }, [quiz])

  const handleLimitUpdate = async () => {
    setLimitUpdating(true)
    await updateUserLimit({variables: {id: quiz.id, limit: parseInt(userLimit)}})
    setLimitUpdating(false)
  }

  return (
    <div>
      <Segment stacked>
        <Message info={userLimit > currentUsers} error={userLimit!='' && userLimit <= currentUsers}>
          {userLimit!='' && userLimit <= currentUsers && <h4>Currently at capacity. No more users will be able to sign up until we increase the user limit.</h4>}
          <List bulleted horizontal>
            <List.Item>Maximum Users Allowed: {userLimit}</List.Item>
            <List.Item>Current Total Users: {currentUsers}</List.Item>
          </List>
        </Message>
        <Form onSubmit={() => {handleLimitUpdate()}}>
          <Form.Field>
            <label>User Limit</label>
            <Form.Input
              value={userLimit}
              onChange={(e) => setUserLimit(e.target.value)}
            >
            </Form.Input>
          </Form.Field>
          <Button color="teal" type="submit">
            <Loader active={limitUpdating} inline="centered"></Loader>
            {!limitUpdating && 'Update User Limit'}
          </Button>
        </Form>
      </Segment>
      <h2>Users</h2>
      <Segment>

        <Item.Group divided>
          {users && users.map((user, i) => (
            <Item>
              <Item.Content>
                <Item.Header>{i+1}) {user.email}</Item.Header>
                <Item.Description>- First Name: {user.firstName ? user.firstName : 'No name given'}</Item.Description>
                <Item.Description>- Completed Quiz: {user && user.reply && user.reply.complete ? 'Yes' : 'No'}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>

      </Segment>
    </div>
  )
}