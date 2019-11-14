import { useQuery } from '@apollo/react-hooks'
import {
  Container as Card,
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Image,
  List,
  Loader,
  Menu,
  Responsive,
  Segment,
  Step,
  Rail,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Steps from '../../components/Steps'
import { withAuthSync } from '../../lib/auth'
import { GET_USER } from '../../data/user'
import Router from 'next/router';

// TODO: Undo hardcoding of this number
const QUESTIONS_COUNT = 48
const Dashboard = (client => {
  return (
    <AdminLayout client={client}>
      <Segment placeholder>
        <Header icon><Icon name="wait"></Icon>Nothing here yet</Header>
      </Segment>
    </AdminLayout>
  )
})

export default withAdminAuthSync(Dashboard)