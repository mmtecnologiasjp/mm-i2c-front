import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { useIsGroupRoute } from '../useIsGroupRoute';
import { GroupWithMessage } from '../useUserGroupsQuery/types';

const fetchGroup = async (uuid: string) => {
  const res = await api.get<GroupWithMessage>(`/groups/${uuid}`);

  return res.data;
};

export const useGroupQuery = (uuid: string | undefined) => {
  const { isGroupRoute } = useIsGroupRoute();
  if (!uuid || !isGroupRoute) return { group: undefined };

  const { data } = useQuery({
    queryFn: () => fetchGroup(uuid),
    queryKey: ['group', uuid],
  });

  return { group: data };
};
