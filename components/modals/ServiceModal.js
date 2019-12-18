import { useState } from "react";
import { Button, Icon, Modal, Label, Form, Dropdown } from "semantic-ui-react";
import ReactQuill from "react-quill";

export default function({
  text,
  action,
  values,
  controlled = false,
  open,
  setOpen
}) {
  const types = ["workshop", "profile", "extra"];
  const [service, setService] = useState(
    values || { title: "", body: "", tag: "" }
  );
  const [modalOpen, setModalOpen] = controlled
    ? [open, setOpen]
    : useState(false);

  return (
    <div>
      {!controlled && (
        <Label
          basic
          as="a"
          attached="top right"
          onClick={() => setModalOpen(true)}
        >
          <Icon name="edit outline"></Icon>
        </Label>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>{text}</Modal.Header>
        <Modal.Content>
          <Form>
            {!values && (
              <Form.Field
                control={Dropdown}
                selection
                placeholder="Type"
                value={values && values.tag}
                options={types.map((type, i) => ({
                  key: i,
                  text: type,
                  value: type
                }))}
                onChange={(e, selection) => {
                  setService(state => ({ ...state, tag: selection.value }));
                }}
              ></Form.Field>
            )}
            <Form.Field>
              <label>Title</label>
              <ReactQuill
                onChange={val =>
                  setService(state => ({ ...state, title: val }))
                }
                defaultValue={values && values.title}
                modules={{ toolbar: [["bold", "italic", "underline"]] }}
              ></ReactQuill>
            </Form.Field>
            <Form.Field>
              <label>Body</label>
              <ReactQuill
                defaultValue={values && values.body}
                onChange={val => setService(state => ({ ...state, body: val }))}
              ></ReactQuill>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button simple onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            primary
            onClick={() => {
              action({ variables: service });
              setModalOpen(false);
            }}
          >
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
