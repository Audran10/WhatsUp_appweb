import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userSlice';
import { User } from '../../models/User';

interface LoginHookArgs {
  email?: string;
  phoneNumber?: string;
  password: string;
}

interface LoginResponse {
  user: User;
  access_token: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async ({
    email,
    phoneNumber,
    password,
  }: LoginHookArgs): Promise<void> => {
    const body = {
      email: email,
      phone: phoneNumber,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result: LoginResponse = await response.json();
      localStorage.setItem('access_token', result.access_token);
      dispatch(setUser(result.user));
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  return login;
};
