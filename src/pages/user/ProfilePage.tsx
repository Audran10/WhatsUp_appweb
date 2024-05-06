import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../reducers/userSlice';
import InputProfileItem from '../../components/items/InputProfileItem';
import UserPicItem from '../../components/items/UserPicItem';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoExitOutline } from 'react-icons/io5';
import updateMyUser from '../../hooks/users/updateMyUser';
import { useNavigate } from 'react-router-dom';
import { BecomeAdmin } from '../../hooks/admin/BecomeAdmin';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';

interface ProfilePageProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setShowProfile }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const [userPicture, setUserPicture] = useState<File | undefined>(undefined);
  const [name, setName] = useState<string>(user?.pseudo || '');
  const [language, setLanguage] = useState<string>(localStorage.getItem('locale') || 'fr');

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  }

  const handleUpdateProfile = () => {
    const formData = new FormData();

    if (name) {
      formData.append('pseudo', name);
    }

    if (userPicture) {
      formData.append('file', userPicture);
    }

    updateMyUser(user?._id, formData).then((updatedUser) => {
      dispatch(setUser(updatedUser));

      if(language !== localStorage.getItem('locale')) {
        localStorage.setItem('locale', language);
        i18n.changeLanguage(language);
      }

      window.location.reload();
    });
  };

  const handleAdmin = async (userId: string) => {
    try {
      const updatedUser = await BecomeAdmin(userId);

      if (updatedUser) {
        dispatch(setUser(updatedUser));
      }

      navigate('/admin');
    } catch (error) {
      console.error('Error making user an admin:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(setUser(null));
    navigate('/login');
  };

  return (
    <div className='h-full justify-center items-center bg-secondaryWhite'>
      <div className='flex h-[14%] w-full p-6 items-end justify-between bg-mainGreen'>
        <div className='flex gap-8'>
          <button onClick={() => setShowProfile(false)}>
            <FaArrowLeft className='h-6 w-6 text-mainWhite' />
          </button>
          <h1 className='text-2xl text-mainWhite'>{t('profile')}</h1>
        </div>

        <div className='flex gap-3 ml-auto'>
          <button onClick={() => handleAdmin(user._id)} className='flex'>
            <MdOutlineAdminPanelSettings className='flex h-7 w-7 text-mainWhite' />
          </button>

          <button onClick={() => handleLogout()} className='flex'>
            <IoExitOutline className='flex h-7 w-7 text-mainWhite' />
          </button>
        </div>
      </div>

      <UserPicItem
        placeholder={t('profile_add_picture')}
        picture={user.picture_url}
        setUserPicture={setUserPicture}
      />

      <div className='flex justify-center gap-4 w-full mb-4'>
        <label htmlFor='fr'>Français</label>
        <input
          type='radio'
          id='fr'
          value='fr'
          name='language'
          defaultChecked={i18n.language === 'fr'}
          onChange={handleChangeLanguage}
        />

        <label htmlFor='en'>English</label>
        <input
          type='radio'
          id='en'
          value='en'
          name='language'
          defaultChecked={i18n.language === 'en'}
          onChange={handleChangeLanguage}
        />
      </div>

      <InputProfileItem
        labelName={t('profile_name')}
        type='text'
        value={name}
        required={false}
        maxLength={64}
        onChangeValue={(e) => setName(e.target.value)}
      />

      <div className='text-base mb-4 py-4 px-8'>
        {t('profile_name_description')}
      </div>

      <div className='flex justify-center w-full'>
        <button
          className='bg-mainGreen text-mainWhite p-2 rounded-lg mt-2 w-32'
          onClick={handleUpdateProfile}
        >
          {t('profile_save')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
