import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { GET_PLACEMENTS, UPDATE_ANSWER } from '../data/quiz'
import { GET_USER } from '../data/user'
import {
  Dimmer,
  Loader,
  Progress,
  Grid,
  Transition
} from 'semantic-ui-react'

import QuizLayout from '../components/layouts/QuizLayout'
import StepForm from '../components/StepForm'

const calcPercent = (completed, total) => parseInt((completed/total) * 100)
const isolateStep = (array, step) => {
  if (step === 0 && array.length) return [array[0]]
  if (step < 0) return []

  return array.slice(step-1, step)
}

const q = (({client}) => {
  const {data: {user}} = useQuery(GET_USER)
  const {loading, error, data: {reply}}= useQuery(GET_PLACEMENTS)
  const [updateAnswer, {...answerReq}] = useMutation(UPDATE_ANSWER)

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
    // set initial state
    if (user) {
      setName(user.firstName)
    }
    if (reply && !questions.length) {
      console.log(reply)
      updateAnswers(reply.answers)
      setPercent(calcPercent(reply.completed, reply.answers.length))
      setStep(reply.completed || 0)
    }
  }, [user, reply])



  const done = (questions.length && step === questions.length)
  return (
    <QuizLayout name={ name }>
      <Grid style={{minHeight: '325px'}}>
        <Grid.Column verticalAlign="middle">
          { (loading || answerReq.loading) && <Dimmer active inverted><Loader></Loader></Dimmer> }
          { done && <p>Done!</p>}
          { !done && isolateStep(questions, step).map((answer, i) => <StepForm prompt={ answer.placement.prompt }
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