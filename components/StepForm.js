import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import {
  Button,
  Grid,
  Dimmer,
  Header,
  Label,
  Form,
  FormGroup,
  Loader,
  Radio,
  Segment
} from "semantic-ui-react";
import Visible from "../components/Visible";

const StepForm = ({
  id,
  value,
  prompt,
  index,
  loading,
  step,
  handleChange
}) => {
  return (
    <div>
      <Segment>
        <Grid style={{ textAlign: "left" }}>
          <Grid.Column width={1}>
            <Label attached="top left">
              <Visible show={loading}>
                <Loader active={loading} inline="centered" size="mini"></Loader>
              </Visible>
              {!loading && `${index + 1}.`}
            </Label>
          </Grid.Column>
          <Grid.Column width={15}>
            <Header>
              <h3 dangerouslySetInnerHTML={{ __html: prompt }}></h3>
            </Header>
            <Form>
              <Grid doubling stackable columns={5}>
                <Grid.Column>
                  <Form.Field
                    control={Radio}
                    name="quiz"
                    label="Strongly Disagree"
                    value={1}
                    onChange={(e, { value }) =>
                      e.preventDefault && handleChange(id, value, index)
                    }
                    defaultChecked={value === 1}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Radio}
                    label="Disagree"
                    name="quiz"
                    value={2}
                    onChange={(e, { value }) => handleChange(id, value, index)}
                    defaultChecked={value === 2}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Radio}
                    label="I don't know"
                    name="quiz"
                    value={3}
                    onChange={(e, { value }) => handleChange(id, value, index)}
                    defaultChecked={value === 3}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Radio}
                    label="Agree"
                    name="quiz"
                    value={4}
                    onChange={(e, { value }) => handleChange(id, value, index)}
                    defaultChecked={value === 4}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Radio}
                    label="Strongly Agree"
                    name="quiz"
                    value={5}
                    onChange={(e, { value }) => handleChange(id, value, index)}
                    defaultChecked={value === 5}
                  />
                </Grid.Column>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>

      <div style={{ marginTop: 18 }}>
        {index > 0 && (
          <Button onClick={() => step(index - 1 || 0)}>Prev</Button>
        )}
        {value && (
          <Button onClick={() => step(index + 1)} color="teal">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
