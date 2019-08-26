import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { GET_PLACEMENTS } from '../data/quiz'
import {
  Dimmer,
  Loader,
  Progress,
  Grid,
  Transition
} from 'semantic-ui-react'
import { UPDATE_ANSWER } from '../data/quiz'
import QuizLayout from '../components/layouts/QuizLayout'
import StepForm from '../components/StepForm'

const calcPercent = (completed, total) => parseInt((completed/total) * 100)
const slice = (array, step) => {
  if (step === 0) return [array[0]]
  if (step < 0) return []

  return array.slice(step-1, step)
}
const q = (props => {
  const {loading, error, data: { user } }= useQuery(GET_PLACEMENTS)
  const [updateAnswer, {...updatingAnswer}] = useMutation(UPDATE_ANSWER)

  const [step, setStep] = useState(0)
  const [questions, updateAnswers] = useState([])
  const [percentComplete, setPercent] = useState(0)
  const [name, setName] = useState('Home')

  const handleAnswerUpdate = async (id, value, index) => {
    const { data } = await updateAnswer({ variables: {id: id, value: value}})
    const {reply: {completed, answers}} = data.updateAnswer

    updateAnswers(answers)
    setPercent(calcPercent(completed, answers.length))
    setStep(index + 1)
  }

  if (error) {
    return <div>{error.message}</div>
  }

  useEffect(() => {
    // Load initial data
    if (user && !questions.length) {
      updateAnswers(user.reply.answers)
      setPercent(calcPercent(user.reply.completed, user.reply.answers.length))
      setName(user.firstName)
      setStep(user.reply.completed || 0)
    }
  })

  const done = step === questions.length
  return (
    <QuizLayout name={ name }>
      <Grid style={{minHeight: '500px'}}>
        <Grid.Column verticalAlign="middle">
          { (loading || updatingAnswer.loading) && <Dimmer active inverted><Loader></Loader></Dimmer> }
          { done && <p>Done!</p>}
          { !done && slice(questions, step).map((answer, i) => <StepForm prompt={ answer.placement.prompt }
                                          index={step}
                                          show={true}
                                          handleChange={handleAnswerUpdate}
                                          key={Math.random()}
                                          step={setStep}
                                          {...answer} />)}
        </Grid.Column>
      </Grid>
      { !done && <Progress percent={percentComplete}
                           progress
                           size="small"
                           color="olive"></Progress> }
    </QuizLayout>
  )
})

export default withAuthSync(q)