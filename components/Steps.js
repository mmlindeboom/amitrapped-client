import {
  Icon,
  Step,
  Label
} from 'semantic-ui-react'
import Router from 'next/router'

const Steps = ({percentComplete}) => {
  const quizIncomplete = percentComplete < 100
  return (
    <Step.Group size="small">
      <Step active={quizIncomplete} color="teal" disabled={!quizIncomplete} onClick={() => Router.push('/q')}>
        {quizIncomplete && <Icon name='check circle outline' color="grey" size="mini" />}
        {!quizIncomplete && <Icon name='check' color="green" size="mini" />}
        <Step.Content>
          <Step.Title color="teal">{percentComplete > 0 ? 'Complete' : 'Take'} the quiz</Step.Title>
          {quizIncomplete && <Label color="teal" floating>{percentComplete}%</Label>}
        </Step.Content>
      </Step>
      <Step active={!quizIncomplete} link disabled={quizIncomplete}
                                          onClick={() => !quizIncomplete ? Router.push('/traps') : false}>
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