import Overview from '../components/section/Overview'
import Container from "../components/layout/Container"
import LiveBookings from '../components/section/LiveBookings'
import RecentCompleted from '../components/section/completedBooking'

const Dashboard = () => {
  return (
    <>
      <Container>
        <Overview />
        <LiveBookings />
        <RecentCompleted />
      </Container>
    </>
  )
}

export default Dashboard