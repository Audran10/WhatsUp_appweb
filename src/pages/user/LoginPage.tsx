import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import InputItem from '../../components/items/InputItem.tsx';
import BackgroundAuth from '../../components/backgrounds/BackgroundAuth.tsx';

import { validateEmail, validateOnlyNumbers } from '../../utils/utils.tsx';

import { useLogin } from '../../hook/authentifiation/Login.tsx';

const LoginPage: React.FC = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const LoginHook = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validateOnlyNumbers(emailOrPhoneNumber) &&
      emailOrPhoneNumber.length === 10
    ) {
      try {
        await LoginHook({
          phoneNumber: emailOrPhoneNumber,
          password: password,
        });

        navigate('/'); // Redirect to Home page
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (validateEmail(emailOrPhoneNumber)) {
      try {
        await LoginHook({
          email: emailOrPhoneNumber,
          password: password,
        });

        navigate('/'); // Redirect to Home page
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <main className="w-full flex">
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div>
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Se connecter
              </h3>
              <p>
                Pas de compte?{' '}
                <Link
                  className="font-medium text-mainGreen hover:text-emerald-600"
                  to="../signup"
                >
                  Créez votre compte
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputItem
              labelName="Email ou n° de téléphone"
              type="text"
              value={emailOrPhoneNumber}
              required={true}
              onChangeValue={(e) => setEmailOrPhoneNumber(e.target.value)}
            />

            <InputItem
              labelName="Mot de passe"
              type="password"
              value={password}
              required={true}
              onChangeValue={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-mainGreen hover:bg-emerald-600 active:bg-mainGreen rounded-lg duration-150"
            >
              Connexion à votre compte
            </button>
          </form>
        </div>
      </div>
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-emerald-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <div className="flex w-auto gap-6 items-center">
            <img alt="Logo" src="src/assets/logo_outline.png" width={120} />
            <h1 className="text-white text-4xl font-bold">Whats'Up</h1>
          </div>
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Continue de discuter avec tes amis !
            </h3>
            <p className="text-gray-300">
              Connecte toi à ton compte pour avoir accès à Whats'Up
            </p>
          </div>
        </div>
        <BackgroundAuth />
      </div>
    </main>
  );
};

export default LoginPage;
