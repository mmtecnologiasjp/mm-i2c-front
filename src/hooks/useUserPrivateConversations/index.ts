import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { useUser } from '../../store/useUser';
import { UserPrivateConversations } from './types';

const fetchPrivateConversations = async (uuid: string) => {
  const res = await api.get<UserPrivateConversations[]>(
    `/private-conversations/user/${uuid}`,
  );

  return res.data;
};

export const privateConversationsQueryKey = 'private_conversations';

export const useUserPrivateConversationsQuery = () => {
  const { user } = useUser();
  const { data } = useQuery({
    queryFn: () => {
      if (!user?.uuid) return;

      return fetchPrivateConversations(user.uuid);
    },
    queryKey: [privateConversationsQueryKey],
  });

  return { privateConversationsUsers: data };
};
