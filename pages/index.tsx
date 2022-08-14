import Alerts from '@/core/components/Alerts/Alerts';
import Login from '@/core/components/Login/Login';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Alerts />
      <Login />
    </>
  );
};

export default Home;
