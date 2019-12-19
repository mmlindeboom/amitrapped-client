import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import { withAuthSync } from "../lib/auth";
import { USER_TRAPS } from "../data/user";
import Link from "next/link";
import {
  Button,
  Breadcrumb,
  Label,
  List,
  Dimmer,
  Header,
  Icon,
  Message,
  Loader,
  Grid,
  Segment,
  Card,
  Responsive,
  Divider
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import TrapCard from "../components/TrapCard";
import { GET_USER, UPDATE_USER_HAS_REVIEWED_TRAPS } from "../data/user";
import { TwitterShareButton, FacebookShareButton } from "react-share";
import Router from 'next/router'

import Sticky from "react-sticky-el";

const isolateStep = (array, step) => {
  const clonedArray = array;

  if (step === 0 && clonedArray.length) return [clonedArray[0]];
  if (step < 0) return [];

  return clonedArray.slice(step, step + 1);
};

const Traps = ({ client }) => {
  const {
    data: { userTraps, user },
    loading
  } = useQuery(USER_TRAPS);

  const [updateUserReviewedTraps] = useMutation(
    UPDATE_USER_HAS_REVIEWED_TRAPS,
    {
      refetchQueries: [{ query: GET_USER }]
    }
  );

  const [activeTrap, setActiveTrap] = useState(null);
  const [stuck, setStuck] = useState(false);

  const toggleActiveTrap = trap => {
    setActiveTrap(trap ? trap : null);
  };
  useEffect(() => {
    if (user && !user.reviewedTraps) {
      updateUserReviewedTraps();
    }
  }, [user]);

  useEffect(() => {
    if (userTraps) {
      setActiveTrap({
        active: true,
        ...userTraps[0]
      });
    }
  }, [userTraps]);
  return (
    <AppLayout client={client} page="Traps">
      <Grid relaxed style={{ maxWidth: 850 }} color="slightGrey">
        <Grid.Row style={{padding: '25px 0'}}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Traps Review</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Message info>
              <p>
                {user && user.firstName ? `Hello ${user.firstName}` : "Hello"}!
                Below are your most common screen traps (ranked from most to
                least).
              </p>
              <p>
                Remember, the results of this quiz are meant to empower you with
                knowledge of the destructive habit loops that have been running
                on autopilot outside of your awareness, until today! Now that
                you know what to lookout for, these unwanted screen habits can
                never happen again without you recognizing that they’re
                happening.
              </p>
              <p>
                I invite you to review your results below and familiarize
                yourself with all 10 screen traps so you can become vigilant of
                when they’ve hijacked the steering wheel on your digital
                behavior, and that of those you care about!
              </p>

              <p>
                Once we’re aware of our habit loops we can get curious about
                them: “Why am I doing this? What triggered the behavior? What
                reward am I really getting from this? Do I want to keep doing
                this?” On the next page, you’ll find the tools you need to
                answer these questions and change your digital behavior for
                good.
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group horizontal>
              <Segment>
                <Label attached="top">Share</Label>
                <List horizontal>
                  <List.Item>
                    <TwitterShareButton
                      url="https://www.amitrapped.com"
                      title="Dear Internet, I’ve just taken the first step on The Digital Behaviorist’s digital health journey to improve my screen habits. I’m sharing this commitment in hopes of enlisting accountaiblibuddies to surround myself with people who share healthy digital habits that mirror the way I want to live, and support each other in making changes to our digital habits. Join me? If you’re interested, take this quiz as the first step to learn ways you may be trapped in unwanted screen behavior."
                    >
                      <Button color="twitter" icon>
                        <Icon name="twitter"></Icon>
                      </Button>
                    </TwitterShareButton>
                  </List.Item>
                  <List.Item>
                    <FacebookShareButton
                      url="https://www.amitrapped.com"
                      quote="Dear Internet, I’ve just taken the first step on The Digital Behaviorist’s digital health journey to improve my screen habits. I’m sharing this commitment in hopes of enlisting accountaiblibuddies to surround myself with people who share healthy digital habits that mirror the way I want to live, and support each other in making changes to our digital habits. Join me? If you’re interested, take this quiz as the first step to learn ways you may be trapped in unwanted screen behavior."
                    >
                      <Button color="facebook" icon>
                        <Icon name="facebook"></Icon>
                      </Button>
                    </FacebookShareButton>
                  </List.Item>
                </List>
              </Segment>
              <Segment>
               <Label attached="top">Next step</Label>
                <Button onClick={() => Router.push('/action') }basic color="teal" fluid>
                  Take Action
                </Button>
              </Segment>
            </Segment.Group>

            {userTraps && !userTraps.length && (
              <Segment placeholder>
                <Header icon>
                  <Icon name="coffee"></Icon>
                  Whoops! We couldn't find any traps for you.
                  <Header.Subheader>
                    But, we're hard at work fixing the problem!
                  </Header.Subheader>
                </Header>
                <Button primary>Get in touch with us</Button>
              </Segment>
            )}
          <Divider></Divider>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      <Grid relaxed style={{ maxWidth: 850 }}>
        <Grid.Row>
          <Grid.Column>

            <div style={{ position: "relative" }}>
              {activeTrap && (
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Sticky
                    stickyStyle={{
                      width: "120%",
                      background: "#ffffff",
                      zIndex: 100,
                    }}
                    onFixedToggle={() => setStuck(true)}
                  >
                    <TrapCard stuck={stuck} {...activeTrap} />
                  </Sticky>
                </Responsive>
              )}
            </div>

            {userTraps && userTraps.length >= 1 && (
              <div>
                {loading && (
                  <Dimmer active inverted>
                    <Loader></Loader>
                  </Dimmer>
                )}
                <Header style={{marginTop: 35}}as="h4">Your traps:</Header>
                <Card.Group itemsPerRow={2} style={{ padding: "25px" }}>
                  {userTraps &&
                    userTraps.filter(trap => trap.score >= 3).map((trap, idx) => (
                      <TrapCard
                        as={TrapCard}
                        activeTrap={activeTrap}
                        toggleActiveTrap={toggleActiveTrap}
                        placement={idx}
                        key={idx}
                        highlight={
                          activeTrap ? activeTrap.name === trap.name : false
                        }
                        {...trap}
                      />
                    ))}
                </Card.Group>
               <Header as="h4">The rest:</Header>
                <Card.Group itemsPerRow={2} style={{ padding: "25px" }}>
                  {userTraps &&
                    userTraps.filter(trap => trap.score < 3).map((trap, idx) => (
                      <TrapCard
                        as={TrapCard}
                        activeTrap={activeTrap}
                        toggleActiveTrap={toggleActiveTrap}
                        placement={idx}
                        key={idx}
                        highlight={
                          activeTrap ? activeTrap.name === trap.name : false
                        }
                        {...trap}
                      />
                    ))}
                </Card.Group>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  );
};

export default withAuthSync(Traps);
