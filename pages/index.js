import { useQuery } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import Router from "next/router";
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Icon,
  Item,
  Image,
  Loader,
  Segment,
  Responsive
} from "semantic-ui-react";
import { withAuthSync } from "../lib/auth";
import { GET_USER } from "../data/user";
import todos from "../data/todos";
import AppLayout from "../components/AppLayout";
import Steps from "../components/Steps";

const Home = ({ client }) => {
  const { loading, error, data } = useQuery(GET_USER);
  const [userState, setUserState] = useState({
    name: "",
    percentComplete: 0,
    reviewedTraps: false
  });
  const [todo, setTodo] = useState(todos["incomplete"]);

  if (error) {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    if (data && data.user) {
      let user = data.user
      let percent = user.reply.percentComplete
      let status = user.reviewedTraps
        ? "takeAction"
        : percent < 100
        ? "incomplete"
        : "complete";
      setUserState({
        name: user.firstName,
        percentComplete: percent,
        status: status
      });
      setTodo(todos[status]);
    }
  }, [data]);

  return (
    <AppLayout client={client}>
      <Grid celled="internally" relaxed>
        {loading && (
          <Dimmer active inverted>
            <Loader></Loader>
          </Dimmer>
        )}
        <Grid.Row stretched>
          <Grid.Column>
            <Header>The Plan</Header>
            <Steps percentComplete={userState.percentComplete} status={userState.status} inverted></Steps>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header>What you can do right now</Header>
            <Segment>
              <Item.Group>
                <Item>
                  <Image
                    size="small"
                    circular
                    bordered
                    src="/static/ReviewTraps.png"
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="a">{todo.header}</Item.Header>
                    <Item.Meta>{todo.meta}</Item.Meta>
                    <Item.Description>{todo.description}</Item.Description>
                    <Item.Extra>
                      <Responsive {...Responsive.onlyTablet}>
                        <Button
                          primary
                          fluid
                          onClick={() => Router.push(todo.url)}
                        >
                          {todo.cta}
                          <Icon name="right chevron" />
                        </Button>
                      </Responsive>

                      <Responsive {...Responsive.onlyComputer}>
                        <Button
                          primary
                          floated="right"
                          onClick={() => Router.push(todo.url)}
                        >
                          {todo.cta}
                          <Icon name="right chevron" />
                        </Button>
                      </Responsive>
                      <Responsive {...Responsive.onlyMobile}>
                        <Button
                          primary
                          fluid
                          onClick={() => Router.push(todo.url)}
                        >
                          {todo.cta}
                          <Icon name="right chevron" />
                        </Button>
                      </Responsive>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  );
};

export default withAuthSync(Home);
