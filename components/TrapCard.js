import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import {
  Item,
  Grid,
  Segment
} from 'semantic-ui-react'
import Visible from '../components/Visible'

const StepForm = ({ name, description, isVisible }) => {

  return (
    <Visible show={isVisible}>
      <Grid verticalAlign="middle" style={{marginTop: 24, marginBottom: 32}}>
        <Grid.Column>
          <Item.Group style={{minHeight: 250}}>
            <Item>
              <Item.Image src={`/static/traps/${name.toLowerCase().split(' ').join('-')}.png`} />
              <Item.Content verticalAlign="middle">
                <Item.Header>{name}</Item.Header>
                <Item.Description>{description}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Visible>
  )
}

export default StepForm