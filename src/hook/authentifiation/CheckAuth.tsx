import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const token = localStorage.getItem('access_token');

  if (token && user) {
    return user;
  }

  return null;
};
