import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { useIsGroupRoute } from '../useIsGroupRoute';
import { useRouteUUID } from '../useRouteUUID';
import { PrivateConversation } from './types';

const fetchPrivateConversation = async (uuid: string) => {
  const response = await api.get<PrivateConversation>(`/private-conversations/${uuid}`);

  return response.data;
};

export const usePrivateConversationQuery = () => {
  const { uuid } = useRouteUUID();
  const { isGroupRoute } = useIsGroupRoute();

  const { data } = useQuery({
    queryFn: () => {
      if (isGroupRoute || !uuid) return;

      return fetchPrivateConversation(uuid);
    },
    queryKey: ['private_conversation', uuid],
    staleTime: Infinity,
  });

  return { privateConversation: data };
};
