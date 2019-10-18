import { useQuery } from '@apollo/react-hooks'
import {
  Dimmer,
  Grid,
  Divider,
  Loader,
} from 'semantic-ui-react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { withAuthSync } from '../../lib/auth'
import { USER_TRAPS } from '../../data/user'
import EditTrapForm from '../../components/EditTrapForm'

const Dashboard = (client => {
  const {data: {userTraps}, loading}= useQuery(USER_TRAPS)
  return (
    <AdminLayout client={client}>
      {loading && <Dimmer><Loader></Loader></Dimmer>}
       <Grid relaxed celled='internally' style={{maxWidth: '1024px', margin: '0 auto'}}>
        {userTraps && userTraps.map(trap => (
          <Grid.Row>
            <Grid.Column>
              <EditTrapForm trap={trap}></EditTrapForm>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </AdminLayout>
  )
})

export default withAuthSync(Dashboard)