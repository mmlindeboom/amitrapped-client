import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import {
  Button,
  Grid,
  Header,
  Label,
  Form,
  FormGroup,
  Radio,
  Segment
} from 'semantic-ui-react'
import Visible from '../components/Visible'

const StepForm = ({ id, value, prompt, index, show, step, handleChange}) => {

  return (
    <Visible show={show}>
      <Segment>
          <Grid style={{textAlign: 'left'}}>
            <Grid.Column width={1}><Label attached="top left">{index+1}.</Label></Grid.Column>
            <Grid.Column width={15}>
              <Header as="h3">{prompt}</Header>
              <Form>
                <FormGroup inline>
                  <Form.Field
                    control={Radio}
                    label='Strongly Disagree'
                    value={1}
                    onChange={(e, {value}) => (e.preventDefault && handleChange(id, value, index))}
                    defaultChecked={value === 1}/>
                  <Form.Field
                    control={Radio}
                    label='Disagree'
                    value={2}
                    onChange={(e, {value}) => handleChange(id, value, index)}
                    defaultChecked={value === 2}/>
                  <Form.Field
                    control={Radio}
                    label="I don't know"
                    value={3}
                    onChange={(e, {value}) => handleChange(id, value, index)}
                    defaultChecked={value === 3}/>
                  <Form.Field
                    control={Radio}
                    label="Agree"
                    value={4}
                    onChange={(e, {value}) => handleChange(id, value, index)}
                    defaultChecked={value === 4}/>
                  <Form.Field
                    control={Radio}
                    label="Strongly Agree"
                    value={5}
                    onChange={(e, {value}) => handleChange(id, value, index)}
                    defaultChecked={value === 5}/>
                </FormGroup>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      {index > 0 && <Button onClick={() => step((index - 1) || 0)}>Prev</Button>}
      {value && <Button onClick={() => step(index + 1)} primary>Next</Button>}
    </Visible>
  )
}

export default StepForm