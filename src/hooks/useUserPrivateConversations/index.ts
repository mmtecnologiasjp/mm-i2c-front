import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { UserPrivateConversations } from './types';

const fetchPrivateConversations = async () => {
  const res = await api.get<UserPrivateConversations[]>(
    `/private-conversations/user/${import.meta.env.VITE_USER_MOCK_UUID}`,
  );

  return res.data;
};

export const privateConversationsQueryKey = 'private_conversations';

export const useUserPrivateConversationsQuery = () => {
  const { data } = useQuery({
    queryFn: fetchPrivateConversations,
    queryKey: [privateConversationsQueryKey],
  });

  return { privateConversationsUsers: data };
};
