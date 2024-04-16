import React from 'react';
import Layout from '../../components/user/layout/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import InputProfileItem from '../../components/items/InputProfileItem';
import UserPicItem from '../../components/items/UserPicItem';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [name, setName] = React.useState<string>(user?.pseudo || '');
  const [biography, setBiography] = React.useState<string>(
    user?.biography || 'Salut ! J’utilise WhatsUp.'
  );

  return (
    <Layout
      leftChange={true}
      childrenLeft={
        <div className="h-full justify-center items-center  bg-mainBeige">
          <div className="flex flex-row gap-8 h-[14%] p-6 items-end bg-mainGreen">
            <Link to="..">
              <FaArrowLeft className="h-6 w-6 text-mainWhite" />
            </Link>
            <h1 className="text-2xl text-mainWhite">Profile</h1>
          </div>
          <UserPicItem />
          <InputProfileItem
            labelName={'Votre nom'}
            type="text"
            value={name}
            required={false}
            onChangeValue={(e) => setName(e.target.value)}
          />
          <div className="text-base mb-4 py-4 px-8">
            Ce nom est votre nom d'utilisateur que vos amis verront sur WhatsUp
          </div>
          <InputProfileItem
            labelName={'Info'}
            type="text"
            value={biography}
            required={false}
            onChangeValue={(e) => setBiography(e.target.value)}
          />
        </div>
      }
    >
      <h1 className="text-4xl text-center">profile</h1>
    </Layout>
  );
};

export default HomePage;
