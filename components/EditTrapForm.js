import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect, Fragment } from 'react'
import {
  Button,
  Item,
  Form,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { UPDATE_TRAP } from '../data/admin'

const EditTrapForm = ({trap}) => {
  const [updateTrap, {data, error, loading}] = useMutation(UPDATE_TRAP)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(trap.name)
  const [description, setDescription] = useState(trap.description)

  const handleSubmit = () => {
    updateTrap({variables: {id: trap.id, name: name, description, name}})
    setEditing(false)
  }

  useEffect((() => {
    if (data && data.updateTrap) {
      setName(data.updateTrap.name)
      setDescription(data.updateTrap.description)
    }
  }), [data])

  return (
    <Item.Group>
      <Item>
        { loading && <Dimmer active inverted><Loader></Loader></Dimmer> }
        <Item.Image size="small" src={`/static/traps/${name.toLowerCase().split(' ').join('-')}.png`}
          onError={(e) => e.target.src='/static/traps/placeholder.jpg'}
        />

          {editing &&
            <Item.Content verticalAlign="middle">
              <Form onSubmit={handleSubmit}>
                <Form.Input label="Name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}></Form.Input>
                <Form.TextArea label="Description"
                  defaultValue={description}
                  style={{ minHeight: 200 }}
                  onChange={(e) => setDescription(e.target.value)}></Form.TextArea>
                <Form.Group>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                  <Form.Field control={Button} primary>Update</Form.Field>
                </Form.Group>

              </Form>
            </Item.Content>
          }

          {!editing &&
            <Item.Content verticalAlign="middle">
              <Item.Header>{name}</Item.Header>
              <Item.Meta>Pillar: {trap.pillar.name}</Item.Meta>
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <Button primary onClick={() => setEditing(true)}>Edit</Button>
              </Item.Extra>
            </Item.Content>
          }
      </Item>
    </Item.Group>
  )
}

export default EditTrapForm