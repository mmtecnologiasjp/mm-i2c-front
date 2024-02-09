import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { User } from './types';

const fetchUser = async (uuid: string) => {
  const res = await api.get<User>(`/users/${uuid}`);

  return res.data;
};

export const useUserQuery = () => {
  const uuid = import.meta.env.VITE_USER_MOCK_UUID;

  const { data } = useQuery({
    queryFn: () => {
      if (!uuid) return;

      return fetchUser(uuid);
    },
    queryKey: ['user'],
  });

  return { user: data };
};
