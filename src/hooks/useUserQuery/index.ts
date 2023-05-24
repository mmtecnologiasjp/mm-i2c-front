import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { User } from './types';

const fetchUser = async () => {
  const res = await api.get<User>(`/users/${import.meta.env.VITE_USER_MOCK_UUID}`);

  return res.data;
};

export const useUserQuery = () => {
  const { data } = useQuery({ queryFn: fetchUser, queryKey: 'user' });

  return { user: data };
};
