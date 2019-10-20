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
import { ADMIN_QUERY } from '../../data/admin'
import EditTrapForm from '../../components/EditTrapForm'

const EditQuiz = dynamic(() => import('../../components/admin/EditQuiz'), { ssr: false})

const Dashboard = (client => {
  const {data: { traps, quiz }, loading}= useQuery(ADMIN_QUERY)
  const [active, setActive] = useState('quiz')

  return (
    <AdminLayout client={client}>
      {loading && <Dimmer><Loader></Loader></Dimmer>}
      <Menu tabular>
        <Menu.Item active={active === 'quiz'} onClick={() => setActive('quiz')}>Quiz Settings</Menu.Item>
        <Menu.Item active={active === 'traps'} onClick={() => setActive('traps')}>Traps</Menu.Item>
        <Menu.Item disabled>Questions</Menu.Item>
        <Menu.Item disabled>Pillars</Menu.Item>
      </Menu>
      {active === 'quiz' &&
        <EditQuiz quiz={quiz}></EditQuiz>
      }
      {active === 'traps' &&
        <Grid relaxed celled='internally'>
          { traps && traps.map(trap => (
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