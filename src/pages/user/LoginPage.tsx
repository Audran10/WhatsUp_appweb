import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import InputItem from '../../components/common/items/InputItem.tsx';
import BackgroundAuth from '../../components/backgrounds/BackgroundAuth.tsx';

import { isValidPhoneNumber } from '../../utils/utils';

import { useLogin } from '../../hooks/authentifiation/Login';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n.ts';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    phone: '',
    login: '',
  });

  const navigate = useNavigate();
  const LoginHook = useLogin();

  const isValidInputs = () => {
    let isValid = true;
    const newErrors = {
      phone: '',
      login: '',
    };

    if (!isValidPhoneNumber(phoneNumber)) {
      isValid = false;
      newErrors.phone = t('phone_number_error');
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidInputs()) return;

    try {
      await LoginHook({
        phoneNumber: phoneNumber,
        password: password,
      });
      navigate('/');
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, login: t('login_error') }));
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    localStorage.setItem('locale', selectedLocale);
    i18n.changeLanguage(selectedLocale);
    window.location.reload();
  };

  return (
    <main className='w-full flex'>
      <div className='flex flex-col p-6'>
        <select className='outline-none text-lg' onChange={handleLanguageChange} value={localStorage.getItem('locale') ?? i18n.language}>
          <option value='fr'>Fr</option>
          <option value='en'>En</option>
        </select>
      </div>
      <div className='flex-1 flex items-center justify-center h-screen'>
        <div className='w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0'>
          <div>
            <div className='mt-5 space-y-2'>
              <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                {t('login')}
              </h3>
              <p>
                {t('login_any_account')}{' '}
                <Link
                  className='font-medium text-mainGreen hover:text-emerald-600'
                  to='../register'
                >
                  {t('signup')}
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <InputItem
              labelName={t('phone_number')}
              type='text'
              value={phoneNumber}
              required={true}
              errorMessages={errors.phone}
              maxLength={10}
              onChangeValue={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPhoneNumber(value);
              }}
            />

            <InputItem
              labelName={t('password')}
              type='password'
              value={password}
              required={true}
              onChangeValue={(e) => setPassword(e.target.value)}
            />

            <button
              type='submit'
              className='w-full px-4 py-2 text-white font-medium bg-mainGreen hover:bg-emerald-600 active:bg-mainGreen rounded-lg duration-150'
            >
              {t('login_connexion')}
            </button>
            {errors.login && (
              <p className='text-red-500 text-sm font-medium'>{errors.login}</p>
            )}
          </form>
        </div>
      </div>
      <div className='relative flex-1 hidden items-center justify-center h-screen bg-emerald-900 lg:flex'>
        <div className='relative z-10 w-full max-w-md'>
          <div className='flex w-auto gap-6 items-center'>
            <img alt='Logo' src='src/assets/logo_outline.png' width={120} />
            <h1 className='text-white text-4xl font-bold'>Whats'Up</h1>
          </div>
          <div className=' mt-16 space-y-3'>
            <h3 className='text-white text-3xl font-bold'>
              {t('login_description_title')}
            </h3>
            <p className='text-gray-300'>{t('login_description')}</p>
          </div>
        </div>
        <BackgroundAuth />
      </div>
    </main>
  );
};

export default LoginPage;
