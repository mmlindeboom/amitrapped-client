import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import {
  Item,
  Grid,
  Segment,
  Rating,
  Label,
  Progress
} from 'semantic-ui-react'
import Visible from '../components/Visible'

const StepForm = ({ name, score, description, isVisible }) => {

  return (
    <Visible show={isVisible}>
      <Grid verticalAlign="middle" style={{maxWidth: 800}}>
        <Grid.Column>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image src={`/static/traps/${name.toLowerCase().split(' ').join('-')}.png`} />
                <Item.Content verticalAlign="middle">
                  <Item.Header>{name}</Item.Header>
                  <Item.Description><p dangerouslySetInnerHTML={{ __html: description }}></p></Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
            <Label>Trap Score: {100*(score/5)}%</Label>
          </Segment>
        </Grid.Column>
      </Grid>
    </Visible>
  )
}

export default StepForm