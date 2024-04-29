import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../reducers/userSlice';
import InputProfileItem from '../../components/items/InputProfileItem';
import UserPicItem from '../../components/items/UserPicItem';
import { FaArrowLeft } from 'react-icons/fa6';
import updateMyUser from '../../hooks/users/updateMyUser';

interface ProfilePageProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setShowProfile }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const [userPicture, setUserPicture] = useState<File | undefined>(undefined);
  const [name, setName] = useState<string>(user?.pseudo || '');
  const [biography, setBiography] = useState<string>(
    user?.biography || 'Salut ! J’utilise WhatsUp.'
  );

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  const handleUpdateProfile = () => {
    const formData = new FormData();

    if (name) {
      formData.append('pseudo', name);
    }
    if (biography) {
      formData.append('biography', biography);
    }

    if (userPicture) {
      formData.append('file', userPicture);
    }

    updateMyUser(user?._id, formData).then((updatedUser) => {
      dispatch(setUser(updatedUser));
      window.location.reload();
    });
  };

  return (
    <div className="h-full justify-center items-center bg-secondaryWhite">
      <div className="flex flex-row gap-8 h-[14%] p-6 items-end bg-mainGreen">
        <button
          onClick={() => {
            setShowProfile(false);
          }}>
          <FaArrowLeft className="h-6 w-6 text-mainWhite" />
        </button>
        <h1 className="text-2xl text-mainWhite">Profile</h1>
      </div>

      <UserPicItem
        placeholder="Ajouter une photo de profil"
        picture={user.picture_url}
        setUserPicture={setUserPicture}
      />

      <InputProfileItem
        labelName={'Votre nom'}
        type="text"
        value={name}
        required={false}
        maxLength={64}
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

      <div className="flex justify-center w-full">
        <button
          className="bg-mainGreen text-mainWhite p-2 rounded-lg mt-2 w-32"
          onClick={handleUpdateProfile}>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
