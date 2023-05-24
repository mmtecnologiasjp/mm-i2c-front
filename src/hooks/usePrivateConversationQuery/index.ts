import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { PrivateConversation } from './types';

const fetchPrivateConversation = async (uuid: string | undefined) => {
  const response = await api.get<PrivateConversation>(`/private-conversations/${uuid}`);

  return response.data;
};

export const usePrivateConversationQuery = (uuid: string | undefined) => {
  const { data } = useQuery({
    queryFn: () => fetchPrivateConversation(uuid),
    queryKey: ['private_conversations', uuid],
  });

  return { privateConversation: data };
};
