import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Dimmer,
  Menu,
  Grid,
  Loader,
} from 'semantic-ui-react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { withAdminAuthSync } from '../../lib/auth'
import { ADMIN_QUERY } from '../../data/admin'

const EditQuiz = dynamic(() => import('../../components/admin/EditQuiz'), { ssr: false})
const EditTrapForm = dynamic(() => import('../../components/admin/EditTrapForm'), {ssr: false})
const EditQuestions = dynamic(() => import('../../components/admin/EditQuestions'), {ssr: false})

const Dashboard = (client => {
  const {data: { traps, quiz, welcome }, loading}= useQuery(ADMIN_QUERY)
  const [active, setActive] = useState('quiz')

  return (
    <AdminLayout client={client}>
      {loading && <Dimmer><Loader></Loader></Dimmer>}
      <Menu tabular>
        <Menu.Item active={active === 'quiz'} onClick={() => setActive('quiz')}>Quiz Settings</Menu.Item>
        <Menu.Item active={active === 'traps'} onClick={() => setActive('traps')}>Traps</Menu.Item>
        <Menu.Item active={active === 'questions'} onClick={() => setActive('questions')}>Questions</Menu.Item>
        <Menu.Item disabled>Pillars</Menu.Item>
      </Menu>
      {active === 'quiz' &&
        <EditQuiz quiz={quiz} welcome={welcome}></EditQuiz>
      }
      {active === 'traps' &&
        <Grid relaxed celled='internally' style={{width: 800, margin: '0 auto'}}>
          { traps && traps.map(trap => (
            <Grid.Row>
              <Grid.Column>
                <EditTrapForm trap={trap}></EditTrapForm>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      }
      {active === 'questions' && <EditQuestions traps={traps}/>}

    </AdminLayout>
  )
})

export default withAdminAuthSync(Dashboard)