import Alerts from '@/core/components/Alerts/Alerts';
import Validation from '@/core/components/Validation/Validation';
import type { NextPage } from 'next';

const ValidationPage: NextPage = () => {
  return (
    <>
      <Alerts />
      <Validation />;
    </>
  );
};

export default ValidationPage;
