import {
  Icon,
  Step,
  Label
} from 'semantic-ui-react'
import Router from 'next/router'

const Steps = ({toGo}) => {
  return (
    <Step.Group size="small">
      <Step active color="teal" invert onClick={() => Router.push('/q')}>
        <Icon name='check circle outline' color="grey" size="mini" />
        <Step.Content>
            <Step.Title color="teal">{toGo > 0 ? 'Complete' : 'Take'} the quiz</Step.Title>
          <Label color="teal" floating>{toGo}%</Label>
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
  )
}

export default Steps