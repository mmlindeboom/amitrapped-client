import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {
  Dimmer,
  Menu,
  Grid,
  Loader,
} from 'semantic-ui-react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { withAdminAuthSync } from '../../lib/auth'
import { ADMIN_QUERY } from '../../data/admin'
import Router from '../../routes'

const EditAction = dynamic(() => import('../../components/admin/EditAction'), {ssr: false})
const EditQuiz = dynamic(() => import('../../components/admin/EditQuiz'), { ssr: false})
const EditTrapForm = dynamic(() => import('../../components/admin/EditTrapForm'), {ssr: false})
const EditQuestions = dynamic(() => import('../../components/admin/EditQuestions'), {ssr: false})

const Dashboard = (client => {
  const {data: { traps, quiz, welcome, services }, loading, refetch}= useQuery(ADMIN_QUERY)
  const r = useRouter()
  const [active, setActive] = useState('quiz')

  useEffect(() => {
    if (r.query.tab) setActive(r.query.tab)
  }, [r.query])

  return (
    <AdminLayout client={client}>
      {loading && <Dimmer><Loader></Loader></Dimmer>}
      <Menu tabular>
        <Menu.Item active={active === 'quiz'} onClick={() => Router.pushRoute('admin/index', {tab: 'quiz'})}>Quiz Settings</Menu.Item>
        <Menu.Item active={active === 'traps'} onClick={() => Router.pushRoute('admin/index', { tab: 'traps'})}>Traps</Menu.Item>
        <Menu.Item active={active === 'questions'} onClick={() => Router.pushRoute('admin/index', { tab: 'questions'})}>Questions</Menu.Item>
        <Menu.Item active={active === 'services'} onClick={() => Router.pushRoute('admin/index', {tab: 'services'})}>Services</Menu.Item>
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
      {active === 'services' && <EditAction refetch={refetch} services={services}></EditAction>}

    </AdminLayout>
  )
})

export default withAdminAuthSync(Dashboard)