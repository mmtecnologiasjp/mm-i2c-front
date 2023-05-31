import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { Group } from './types';

const fetchGroups = async () => {
  const res = await api.get<Group[]>(
    `/groups/user/${import.meta.env.VITE_USER_MOCK_UUID}`,
  );

  return res.data;
};

export const useUserGroupsQuery = () => {
  const { data } = useQuery({ queryFn: fetchGroups, queryKey: ['groups'] });

  return { groups: data };
};
