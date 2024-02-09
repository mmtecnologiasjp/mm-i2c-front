import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { useKeyToRerunGroupBadgeMembers } from '../../store/useKeyToRerunGroupBadgeMembers';
import { GroupMember } from '../useGroupMembersQuery/types';
import { useRouteUUID } from '../useRouteUUID';
import { CreateGroupMemberBody } from './types';

const createGroupMember = async ({
  group_uuid,
  user_uuid,
  role,
}: CreateGroupMemberBody) => {
  const res = await api.post('/group-members', {
    group_uuid,
    user_uuid,
    role,
  });

  return res.data;
};

export const useCreateGroupMember = () => {
  const queryClient = useQueryClient();
  const { uuid } = useRouteUUID();
  const {
    actions: { incrementKey },
  } = useKeyToRerunGroupBadgeMembers();

  const { mutate } = useMutation({
    mutationFn: createGroupMember,
    mutationKey: ['create_group_member_mutation'],
    onSuccess: (data: GroupMember) => {
      queryClient.setQueryData<GroupMember[]>(['group_members', uuid], (oldData) => {
        incrementKey();
        if (!oldData) return [data];

        return [...oldData, data];
      });
    },
  });

  return { mutate };
};
