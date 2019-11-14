import { useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import {
  Button,
  Item,
  Icon,
  Form,
  Loader,
  Dimmer,
  Segment,
  Message,
  Modal
} from "semantic-ui-react";
import ReactQuill from "react-quill";
import StepForm from "../StepForm";
import { UPDATE_QUESTION } from "../../data/admin";

const EditQuestionForm = ({ trap, question }) => {
  const [updateQuestion, { data, error, loading }] = useMutation(
    UPDATE_QUESTION
  );

  const [editing, setEditing] = useState(false);
  const [prompt, setPrompt] = useState(question.prompt);

  const handleSubmit = async () => {
    updateQuestion({ variables: { id: question.id, prompt: prompt } });
    setEditing(false);
  };

  useEffect(() => {
    if (data && data.updateQuestion) {
      setPrompt(data.updateQuestion.prompt);
    }
  }, [data]);

  return (
    <Segment stacked>
      {error && <Message error>{error.message}</Message>}
      <Item.Group>
        {loading && (
          <Dimmer active inverted>
            <Loader></Loader>
          </Dimmer>
        )}

        {editing && (
          <Item>
            <Item.Content verticalAlign="middle">
              <Form onSubmit={handleSubmit}>
                <Form.Field
                  as={ReactQuill}
                  value={prompt}
                  onChange={val => setPrompt(val)}
                  modules={{ toolbar: [["bold", "italic", "underline"]] }}
                />
                <Form.Group>
                  <Button basic onClick={() => setEditing(false)}>Cancel</Button>
                  <Form.Field control={Button} primary>
                    Save
                  </Form.Field>
                </Form.Group>
              </Form>
            </Item.Content>
          </Item>
        )}

        {!editing && (
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Description>
                <p dangerouslySetInnerHTML={{ __html: prompt }}></p>
              </Item.Description>
              <Item.Extra>
                <Modal
                  style={{ width: 800 }}
                  trigger={
                    <Button icon basic>
                      <Icon name="eye" />
                    </Button>
                  }
                  closeIcon
                >
                  <Modal.Content>
                    <StepForm
                      id={0}
                      value={null}
                      index={1}
                      prompt={prompt}
                      show={true}
                      step={() => {}}
                      handleChange={() => {}}
                    />
                  </Modal.Content>
                </Modal>
                <Button primary onClick={() => setEditing(true)}>
                  Edit
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        )}
      </Item.Group>
    </Segment>
  );
};

export default EditQuestionForm;
