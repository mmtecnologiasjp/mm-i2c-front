import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { GroupMember } from './types';

const fetchGroupMembers = async (uuid: string) => {
  const res = await api.get<GroupMember[]>(`/group-members/group/${uuid}`);

  return res.data;
};

export const useGroupMembersByGroupQuery = (uuid: string | undefined) => {
  if (!uuid) return {};

  const { data } = useQuery({
    queryFn: () => fetchGroupMembers(uuid),
    queryKey: ['group_members', uuid],
  });

  return { groupMembers: data };
};
