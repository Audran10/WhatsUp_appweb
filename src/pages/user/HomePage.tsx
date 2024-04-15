import React from 'react';
import Layout from '../../components/user/layout/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <Layout>
      <h1 className="text-4xl text-center">
        {user ? user.pseudo : 'User not connected'}
      </h1>
    </Layout>
  );
};

export default HomePage;
