import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import AppLayout from "../components/AppLayout";
import { GET_SERVICES } from '../data/quiz'
import Loader from '../components/utils/Loader'

const ServicesBlock = dynamic(() => import('../components/blocks/ServicesBlock'), {ssr: false})

const Home = ({ client }) => {
  const {data, loading } = useQuery(GET_SERVICES)

  const [services, setServices] = useState([])

  useEffect(() => {
    setServices(data.services)
  }, [data])

  return (
    <AppLayout client={client} page="Take Action">
      <Loader isLoading={loading}></Loader>
      <ServicesBlock services={services}></ServicesBlock>
    </AppLayout>
  );
};

export default Home;
