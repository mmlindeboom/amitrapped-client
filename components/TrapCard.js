import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import {
  Card,
  Button,
  Image,
  Grid,
  Item,
  Segment,
  Label
} from "semantic-ui-react";
import Truncate from "react-truncate";

const StepForm = ({
  name,
  score,
  description,
  imageUrl,
  highlight,
  placement,
  active = false,
  toggleActiveTrap,
  fluid = false,
  stuck
}) => {

  const highlightStyle = highlight ? {border: '1px solid #04839C'} : {}

  if (active) {
    return (
      <div>
        <Grid verticalAlign="middle">
          <Grid.Column>
            <Segment raised={stuck}>
              <Item.Group>
                <Item>
                  <Item.Image src={imageUrl} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>{name}</Item.Header>
                    <Item.Description>
                      <p dangerouslySetInnerHTML={{ __html: description }}></p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
              <Label color="teal">Trap Score: {100 * (score / 5)}%</Label>
              </Segment>
          </Grid.Column>
        </Grid>


      </div>
    );
  } else {
    return (
      <Card fluid={fluid} style={highlightStyle}>
        <Card.Content>
          <Label attached="top right">{placement + 1}</Label>
          <Image src={imageUrl} floated="right" size="small"></Image>

          <Card.Header>{name}</Card.Header>
          <Card.Description>
            <Truncate lines={5}>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </Truncate>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="teal" disabled={highlight}
            onClick={() => {
              toggleActiveTrap({
                name,
                score,
                description,
                imageUrl,
                active: true,
                toggleActiveTrap: toggleActiveTrap
              });
            }}
          >
            Read more
          </Button>
        </Card.Content>

      </Card>
    );
  }
};

export default StepForm;
