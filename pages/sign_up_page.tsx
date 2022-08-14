import Alerts from '@/core/components/Alerts/Alerts';
import SignUp from '@/core/components/SignUp/SignUp';
import type { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  return (
    <>
      <Alerts />
      <SignUp />;
    </>
  );
};

export default SignUpPage;
