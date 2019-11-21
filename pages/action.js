import {
  Segment,
  Button,
  Card,
  Message,
  Grid,
  Header,
  Image,
  Loader
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";

const Home = ({ client }) => {
  return (
    <AppLayout client={client} page="Take Action">
      <Grid celled="internally" relaxed>
        {/* {loading && <Dimmer active inverted><Loader></Loader></Dimmer>} */}
        <Grid.Row stretched>
          <Grid.Column>
            <Header>Journey to Digital Wellness</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
          <Card.Group>
              <Card fluid style={{height: '100%'}}>
                <Card.Content>
                  <Card.Header>One-On-One Coaching</Card.Header>
                  <Card.Description>
                    <p>
                      Personalized guidance from Samantha through the 3 steps ​of
                      the Digital Wellness Journey.
                    </p>
                    <p>
                      Coaching sessions available virtually or in-person around SF
                      Bay Area, CA. All clients will get their own Digital
                      Wellness Kit with behavioral tools designed for each step
                      journey. Journey length varies by participant's need, but
                      typically can be completed in as short as two sessions.
                    </p>
                  </Card.Description>
                </Card.Content>
                <Button
                  as="a"
                  href="https://calendly.com/thedigitalbehaviorist/60min"
                  primary
                  basic
                  target="_blank"
                  attached="bottom">
                      Schedule with Samantha
                  </Button>
              </Card>
              <Card fluid style={{height: '100%'}}>
                <Card.Content>
                  <Card.Header>Group Workshop</Card.Header>
                  <Card.Description>
                    <p>
                      Samantha guides groups (two or more) through an engaging
                      2-hour workshop to complete the Digital Wellness Journey
                      together.
                    </p>
                    <p>
                      Each participant is supplied with their own Digital Wellness
                      Kit that includes a journey 'game board' and digital
                      behavior card deck pictured below! These group workshops
                      create the social accountability needed to support lasting
                      behavior change; digital habits are social habits, so the
                      more positive reinforcement you can surround yourself with,
                      the easier it will be to make changes to your digital
                      behaviors.
                    </p>
                  </Card.Description>
                </Card.Content>

                <Button
                  as="a"
                  href="https://calendly.com/thedigitalbehaviorist/60min"
                  primary
                  basic
                  target="_blank"
                  attached="bottom">
                      Schedule with Samantha
                  </Button>
              </Card>
            </Card.Group>

          </Grid.Column>
          <Grid.Column>
            <Segment basic>
                <Header header>Meet Samantha</Header>
                <Image src="/static/samantha-profile.png" floated="right" />
                <ul>
                  <li>Born, raised and schooled all in the San Francisco Bay Area
                  </li>
                  <li>Mobilized thousands of volunteers in five different states across the U.S for Obama Campaign</li>
                  <li>2 years at Dr. Carol Dweck’s Social
                  Psychology lab at Stanford</li>
                </ul>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Message info>
        <Message.Header>Special note to parents of "SCREENAGERS"</Message.Header>
        <p>I highly encourage group workshops for teenagers, because this is
          a socially motivated stage of development and the two greatest
          challenges I've come across in coaching young people to change
          their screen behavior are social in nature. They are:</p>
          <Message.List>
            <Message.Item>Fear of peer isolation or being cut off from their social lives, the majority of which these days exists online.</Message.Item>
            <Message.Item>The undermining influences that exist outside your family's screen rules, such as differing parameters in the homes of your child's friends.</Message.Item>
          </Message.List>

        <p>This is why OPTION 2 is designed for you to gather a group of your child's friends and/or their friends' parents to shift the collective digital habits of the entire ecosystem you exist in!</p>
      </Message>
    </AppLayout>
  );
};

export default Home;
