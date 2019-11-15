import { useMutation } from "@apollo/react-hooks";
import { useState, useEffect, Fragment } from "react";
import { Button, Card, Form, Loader, Label, Dimmer } from "semantic-ui-react";
import ReactQuill from "react-quill";
import WelcomeForm from "../WelcomeForm";
import { UPDATE_QUIZ, UPDATE_SIGNUP_MESSAGES } from "../../data/admin";

const EditQuiz = ({ quiz, welcome }) => {
  const [updateQuiz, { data, error, loading }] = useMutation(UPDATE_QUIZ);
  const [updateWelcomeMessages] = useMutation(UPDATE_SIGNUP_MESSAGES)

  const [intro, setIntro] = useState("");
  const [signup, setSignup] = useState({ header: "", description: "" });
  const [introEditing, setIntroEditing] = useState(false);
  const [welcomeEditing, setWelcomeEditing] = useState(false);

  const handleSubmit = async () => {
    await updateQuiz({ variables: { id: quiz.id, intro: intro } });
    setEditing(false);
  };

  useEffect(() => {
    if (welcome) {
      setSignup({
        header: welcome.header,
        description: welcome.description
      });
    }
  }, [welcome]);

  useEffect(() => {
    if (!data && quiz) {
      setIntro(quiz.intro);
    }
    if (data && data.quiz) {
      setIntro(data.quiz.intro);
    }
  }, [data, quiz]);

  const { header, description } = signup;

  return (
    <Card.Group style={{ width: 800, margin: "0 auto" }}>
      <Card fluid>
        {loading && (
          <Dimmer inverted>
            <Loader></Loader>
          </Dimmer>
        )}
        <Card.Content header="Intro"></Card.Content>
        {introEditing && (
          <Card.Content>
            <ReactQuill
              value={intro}
              onChange={val => setIntro(val)}
              modules={{ toolbar: [["bold", "italic", "underline"]] }}
            ></ReactQuill>
          </Card.Content>
        )}

        {!introEditing && (
          <Card.Content>
            <Card.Description>
              <p dangerouslySetInnerHTML={{ __html: intro }}></p>
            </Card.Description>
          </Card.Content>
        )}
        <Card.Content extra>
          {introEditing && (
            <div>
              <Button basic onClick={() => setIntroEditing(false)}>Cancel</Button>
              <Button primary onClick={handleSubmit}>
                Save
              </Button>
            </div>
          )}
          {!introEditing && (
            <Button primary onClick={() => setIntroEditing(true)}>
              Edit
            </Button>
          )}
        </Card.Content>
      </Card>

      <Card fluid>
        <Card.Content header="Welcome Page Details"></Card.Content>
        {!welcomeEditing && (
          <Card.Content>
            <Button primary onClick={() => setWelcomeEditing(true)}>
              Edit
            </Button>
          </Card.Content>
        )}
        {welcomeEditing && (
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Header</label>
                <Form.Input
                  name="header"
                  onChange={(e, { name, value }) =>
                    setSignup(state => ({ ...state, [name]: value }))
                  }
                  value={header}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <ReactQuill
                  value={description}
                  onChange={val =>
                    setSignup(state => ({ ...state, description: val }))
                  }
                  modules={{ toolbar: [["bold", "italic", "underline"]] }}
                ></ReactQuill>
              </Form.Field>
            </Form>
          </Card.Content>
        )}
        {welcomeEditing && (
          <Card.Content extra>
            <Button basic onClick={() => setWelcomeEditing(false)}>
              Cancel
            </Button>
            <Button onClick={async () => {
              await updateWelcomeMessages({variables: {id: quiz.id, ...signup}})
              setWelcomeEditing(false)
            }} primary>Save</Button>
          </Card.Content>
        )}
        <Card.Content>
          <Label color="blue" ribbon>
            Preview
          </Label>
          <div style={{ pointerEvents: "none" }}>
            <WelcomeForm
              header={header}
              description={description}
            />
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default EditQuiz;
