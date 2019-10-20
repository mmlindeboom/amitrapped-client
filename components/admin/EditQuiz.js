import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect, Fragment } from 'react'
import {
  Button,
  Card,
  Header,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import ReactQuill from 'react-quill'
import { UPDATE_QUIZ } from '../../data/admin'

const EditQuiz = ({ quiz }) => {
  const [updateQuiz, {data, error, loading}] = useMutation(UPDATE_QUIZ)
  // const [editing, setEditing] = useState(false)
  const [intro, setIntro] = useState('')
  const [editing, setEditing] = useState(false)

  const handleSubmit = async () => {
    await updateQuiz({ variables: {id: quiz.id, intro: intro }})
    setEditing(false)
  }

  useEffect((() => {
    if (!data && quiz) {
      setIntro(quiz.intro)
    }
    if (data && data.quiz) {
      setIntro(data.quiz.intro)
    }
  }), [data, quiz])

  return (
      <Card.Group>
        <Card fluid>
          {loading && <Dimmer inverted><Loader></Loader></Dimmer>}
          <Card.Content header="Intro"></Card.Content>
          {editing &&
            <Card.Content>
              <ReactQuill value={intro}
                        onChange={(val) => setIntro(val)}
                        modules={{toolbar: [['bold', 'italic', 'underline']]}}></ReactQuill>
            </Card.Content>
          }

          {!editing && (
            <Card.Content>
              <Card.Description><p dangerouslySetInnerHTML={{ __html: intro }}></p></Card.Description>
            </Card.Content>
          )}
          <Card.Content extra>
            {editing && (
                <div>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                  <Button primary onClick={handleSubmit}>Save</Button>
                </div>
              )}
            {!editing && <Button primary onClick={() => setEditing(true)}>Edit</Button>}
          </Card.Content>
        </Card>
      </Card.Group>
  )
}

export default EditQuiz