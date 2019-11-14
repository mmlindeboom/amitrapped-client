import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import EditQuestionForm from './EditQuestionForm'
import { GET_QUESTIONS } from '../../data/admin'
import {
  Dimmer,
  Menu,
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react'

export default function({traps}) {
  return traps && traps.map(trap => (
    <Grid relaxed celled='internally' style={{width: 800, margin: '0 auto'}}>
      <Grid.Row>
        <Grid.Column>
          <Header>{trap.name}</Header>
        </Grid.Column>
      </Grid.Row>

      { trap.questions.map(question => (
        <Grid.Row>
          <Grid.Column>
            <EditQuestionForm trap={trap} question={question}></EditQuestionForm>
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  ))
}