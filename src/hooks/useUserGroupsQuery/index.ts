import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { useUser } from '../../store/useUser';
import { Group } from './types';

const fetchGroups = async (uuid: string | undefined) => {
  const res = await api.get<Group[]>(`/groups/user/${uuid}`);

  return res.data;
};

export const useUserGroupsQuery = () => {
  const { user } = useUser();

  const { data } = useQuery({
    queryFn: () => {
      if (!user) return;

      return fetchGroups(user.uuid);
    },
    queryKey: ['groups'],
  });

  return { groups: data };
};
