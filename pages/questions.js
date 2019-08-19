import withData from '../lib/apollo'
import QuestionList from '../components/QuestionList'
import AppLayout from '../components/AppLayout'
export default withData(() => {
  return <AppLayout><QuestionList></QuestionList></AppLayout>
})
