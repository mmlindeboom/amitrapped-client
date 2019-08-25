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

const calcPercent = (completed, total) => (completed/total) * 100

const q = (props => {
  const {loading, error, data: { user } }= useQuery(GET_PLACEMENTS)
  const [updateAnswer] = useMutation(UPDATE_ANSWER)

  const [step, setStep] = useState(0)
  const [questions, updateAnswers] = useState([])
  const [percentComplete, setPercent] = useState(0)
  let name = 'Home'
  const handleAnswerUpdate = async (id, value) => {
    const { data } = await updateAnswer({ variables: {id: id, value: value}})
    const {reply: {completed, answers}} = data.updateAnswer

    updateAnswers(answers)
    setStep(completed)
    setPercent(calcPercent(completed, answers.length))
  }
  if (error) {
    return <div>{error.message}</div>
  }

  useEffect(() => {
    // Load initial data
    if (user && !questions.length) {
      setStep(user.reply.completed)
      updateAnswers(user.reply.answers)
      setPercent(calcPercent(user.reply.completed, user.reply.answers.length))
      name = user.firstName
    }
  })


  return (
    <QuizLayout name={ name }>
      <Grid style={{minHeight: '500px'}}>
        <Grid.Column verticalAlign="middle">
          { (loading) && <Dimmer active inverted><Loader></Loader></Dimmer> }
          { questions.map((answer, i) => <StepForm prompt={ answer.placement.prompt }
                                          index={i}
                                          show={step === i}
                                          handleChange={handleAnswerUpdate}
                                          key={Math.random()}
                                          step={setStep}
                                          {...answer} />)}
        </Grid.Column>
      </Grid>
      <Progress percent={percentComplete} size="small"></Progress>
    </QuizLayout>
  )
})

export default withAuthSync(q)