import { useMutation } from "@apollo/react-hooks";
import { Button, Card } from "semantic-ui-react";

import ServiceModal from "../modals/ServiceModal";
import { UPDATE_SERVICE } from "../../data/admin";

export default function({ cards, editable }) {
  const [updateService, { data, error, loading }] = useMutation(
    UPDATE_SERVICE,
    {
      onCompleted() {
        onUpdate();
      }
    }
  );
  return (
    <div>
      <Card.Group>
        {cards.map((card, i) => (
          <Card fluid style={{ height: "100%" }} key={i}>

            <Card.Content>
              {editable && (
                <ServiceModal
                  text="Edit Profile"
                  values={card}
                  action={updateService}
                ></ServiceModal>
              )}
              <Card.Header>
                <div dangerouslySetInnerHTML={{ __html: card.title }}></div>
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: card.body }}></div>
              </Card.Description>
            </Card.Content>
            <Button
              as="a"
              href="https://calendly.com/thedigitalbehaviorist/60min"
              primary
              basic
              target="_blank"
              attached="bottom"
            >
              Schedule with Samantha
            </Button>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
