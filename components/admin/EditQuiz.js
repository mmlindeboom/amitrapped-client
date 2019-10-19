import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect, Fragment } from 'react'
import {
  Button,
  Item,
  Form,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import ReactQuill from 'react-quill'
import { UPDATE_QUIZ } from '../../data/admin'

const EditQuiz = ({trap}) => {
  const [updateQuiz, {data, error, loading}] = useMutation(UPDATE_QUIZ)
  // const [editing, setEditing] = useState(false)
  const [intro, setIntro] = useState('')
  // const [description, setDescription] = useState(trap.description)

  // const handleSubmit = () => {
  //   updateTrap({variables: {id: trap.id, name: name, description, name}})
  //   setEditing(false)
  // }

  useEffect((() => {
    if (data && data.quiz) {
      setIntro(data.quiz.intro)
    }
  }), [data])

  return (
    <div>
      <ReactQuill value={intro} onChange={(val) => setIntro(val)}></ReactQuill>
      <Button primary onClick={() => updateQuiz({ variables: {id: 33, intro: intro }})}>Save</Button>
    </div>
  )
}

export default EditQuiz