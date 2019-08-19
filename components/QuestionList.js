import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
const GET_QUESTIONS = gql`
  query allQuestions {
    questions {
      prompt
      trap {
        name
      }
    }
  }
`
export default function QuestionList ({client}) {
  const { loading, error, data } = useQuery(GET_QUESTIONS)

  if (data && data.questions) {
    return (
      <ul>
        {data.questions.map(question => <li key={Math.random()}>{question.prompt} ({question.trap.name})</li>)}
      </ul>
    )
  } else if (error) {
    return <div>{error.message}</div>
  } else {
    return <Dimmer active><Loader></Loader></Dimmer>
  }
}