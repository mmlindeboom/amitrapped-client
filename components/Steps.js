import { Icon, Step, Label } from "semantic-ui-react";
import Router from "next/router";

const Steps = ({ percentComplete, status }) => {

  const takeQuiz = status === "incomplete";
  const reviewTraps = status === "complete";
  const takeAction = status === "takeAction";


  return (
    <Step.Group size="small">
      <Step
        active={takeQuiz}
        color="teal"
        disabled={!takeQuiz}
        onClick={() => Router.push("/q")}
      >
        {takeQuiz && (
          <Icon name="check circle outline" color="grey" size="large" />
        )}
        {!takeQuiz && <Icon name="check" color="green" size="large" />}
        <Step.Content>
          <Step.Title color="teal">
            {percentComplete > 0 ? "Complete" : "Take"} the quiz
          </Step.Title>
          {takeQuiz && (
            <Label color="teal" floating>
              {percentComplete}%
            </Label>
          )}
        </Step.Content>
      </Step>
      <Step
        active={reviewTraps}
        link
        disabled={takeQuiz}
        onClick={() => {
          if (!takeQuiz) {
            Router.push("/traps")
          }
        }}
      >
        <Icon name="eye" />
        <Step.Content>
          <Step.Title>Review your traps</Step.Title>
          <Step.Description>
            Your traps will tell you the future
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        link
        active={takeAction}
        disabled={!takeAction}
        onClick={() => (takeAction ? Router.push("/action") : false)}
      >
        <Icon name="heart" />
        <Step.Content>
          <Step.Title>Take action</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default Steps;
