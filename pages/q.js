import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import { GET_QUIZ, UPDATE_ANSWER } from '../data/quiz'
import { GET_USER } from '../data/user'
import {
  Button,
  Dimmer,
  Loader,
  Header,
  Icon,
  Progress,
  Grid,
  Segment
} from 'semantic-ui-react'
import Router from 'next/router'

import QuizLayout from '../components/layouts/QuizLayout'
import StepForm from '../components/StepForm'

const isolateStep = (array, step) => {
  const clonedArray = array
  if (step === 0 && clonedArray.length) return [clonedArray[0]]
  if (step < 0) return []

  return clonedArray.slice(step, step+1)
}

const Intro = ({intro, begin}) => {
return (
        <Grid relaxed doubling stackable style={{textAlign: 'left', margin: '15px'}}>
          <Grid.Column>
            <h3 dangerouslySetInnerHTML={{ __html: intro }}></h3>
            <Button primary onClick={() => begin(true)}>Begin</Button>
          </Grid.Column>
        </Grid>
  )
}

const q = (({client}) => {
  const {loading, error, data: { reply }}= useQuery(GET_QUIZ)
  const [updateAnswer] = useMutation(UPDATE_ANSWER, {
    refetchQueries: [{ query: GET_USER }, { query: GET_QUIZ}]
  })

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [percent, setPercent] = useState(0)
  const [name, setName] = useState('Home')
  const [introSeen, setIntroSeen] = useState(true)
  const [showLoader, setShowLoader] = useState(false)

  const handleAnswerUpdate = async (id, value, index) => {
    setShowLoader(true)
    await updateAnswer({
      variables: {id: id, value: value}
    })

    setStep(index+1)
    setShowLoader(false)
  }

  if (error) {
    return <div>{error.message}</div>
  }

  useEffect(() => {
    if (reply) {
      console.log('reply updating')
      setAnswers(reply.answers)
      setIntroSeen(reply.percentComplete > 0)
      setPercent(reply.percentComplete)
      setStep(reply.completed || 0)
    }
  }, [reply])


  const done = (answers.length && step === answers.length)

  return (
    <QuizLayout name={ name }>
      <Grid style={{minHeight: '325px'}}>
        <Grid.Column verticalAlign="middle">
          { loading && <Dimmer active inverted><Loader></Loader></Dimmer> }

          { done && (
            <Segment placeholder>
              <Header color="olive" icon>
                <Icon name="check"></Icon>
                Finished!
                <Header.Subheader>Now it's time to checkout your Traps</Header.Subheader>
              </Header>
              <Button primary onClick={() => Router.push('/traps')}>Show me my digital traps</Button>
            </Segment>
          )}

          { !introSeen && reply && <Intro intro={reply.quiz.intro} begin={setIntroSeen}></Intro> }
          { introSeen && !done && isolateStep(answers, step).map((answer, i) => <StepForm prompt={ answer.placement.prompt }
                                          index={step}
                                          loading={showLoader}
                                          show={true}
                                          handleChange={handleAnswerUpdate}
                                          key={Math.random()}
                                          step={setStep}
                                          {...answer} />)}
        </Grid.Column>
      </Grid>
      {introSeen && !loading && <Progress percent={percent}
                           progress
                           size="small"
                           color="olive"></Progress> }
    </QuizLayout>
  )
})

export default withAuthSync(q)