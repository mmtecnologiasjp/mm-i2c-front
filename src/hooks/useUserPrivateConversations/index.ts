import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { User } from '../useUserQuery/types';

const fetchPrivateConversations = async () => {
  const res = await api.get<User[]>(
    `/private-conversations/user/${import.meta.env.VITE_USER_MOCK_UUID}`,
  );

  return res.data;
};

export const useUserPrivateConversations = () => {
  const { data } = useQuery({
    queryFn: fetchPrivateConversations,
    queryKey: 'privateConversations',
  });

  return { privateConversationsUsers: data };
};
