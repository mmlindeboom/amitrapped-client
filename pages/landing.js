import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { withAuthSync } from '../lib/auth'
import {
  Button,
  Grid,
  Divider,
  Icon,
  Image,
  Label
} from 'semantic-ui-react'
import QuizLayout from '../components/layouts/QuizLayout'
import { GET_USER } from '../data/user'
import Steps from '../components/Steps'
import Router from 'next/router';

const landing = (props => {
  const {data: {user}, loading} = useQuery(GET_USER)
  const [userName, setUserName] = useState('Home')
  useEffect(() =>{
    if (user) setUserName(user.firstName)
  }, [user])

  return (
    <QuizLayout>
      <Grid columns={2} style={{minHeight: 250}}>
        <Grid.Column verticalAlign="middle" style={{textAlign: 'center'}}>
          <Button basic size="large" icon labelPosition="left" primary onClick={() => Router.push('/q')}>
            <Icon name="check circle outline"></Icon> I'm ready. Take me to my quiz!
          </Button>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" style={{textAlign: 'center'}}>
          <Button basic size="large" icon labelPosition="left" color="teal"><Icon name="wait"></Icon> I'd like more information, first</Button>
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </QuizLayout>
  )
})

export default withAuthSync(landing)