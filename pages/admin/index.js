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
import { withAuthSync } from '../../lib/auth'
import { USER_TRAPS } from '../../data/user'
import EditTrapForm from '../../components/EditTrapForm'

const EditQuiz = dynamic(() => import('../../components/admin/EditQuiz'), { ssr: false})

const Dashboard = (client => {
  const {data: {userTraps}, loading}= useQuery(USER_TRAPS)
  const [active, setActive] = useState('traps')

  return (
    <AdminLayout client={client}>
      {loading && <Dimmer><Loader></Loader></Dimmer>}
      <Menu tabular>
        <Menu.Item ctive={active === 'quiz'} onClick={() => setActive('quiz')}>Quiz</Menu.Item>
        <Menu.Item active={active === 'traps'} onClick={() => setActive('traps')}>Traps</Menu.Item>
        <Menu.Item disabled>Questions</Menu.Item>
        <Menu.Item disabled>Pillars</Menu.Item>
      </Menu>
      {active === 'quiz' &&
        <EditQuiz></EditQuiz>
      }
      {active === 'traps' &&
        <Grid relaxed celled='internally' style={{maxWidth: '1024px', margin: '0 auto'}}>
          { userTraps && userTraps.map(trap => (
            <Grid.Row>
              <Grid.Column>
                <EditTrapForm trap={trap}></EditTrapForm>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      }

    </AdminLayout>
  )
})

export default withAuthSync(Dashboard)