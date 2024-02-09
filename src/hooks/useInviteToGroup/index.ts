import { toast } from 'react-hot-toast';

import { useCreateGroupMember } from '../useCreateGroupMember';
import { useGroupMembersByGroupQuery } from '../useGroupMembersQuery';
import { Role } from '../useGroupMembersQuery/enum';
import { useRouteUUID } from '../useRouteUUID';

export const useInviteToGroup = (onCloseDueNavigation: () => void) => {
  const { mutate } = useCreateGroupMember();
  const { uuid } = useRouteUUID();
  const { groupMembers } = useGroupMembersByGroupQuery(uuid);

  const handleInvite = (userUuid: string) => {
    const userAlreadyIsInTheGroup = groupMembers?.some(
      (groupMember) => groupMember.user_uuid === userUuid,
    );

    if (userAlreadyIsInTheGroup) return toast.error('User already on this group');

    mutate({
      group_uuid: uuid,
      role: Role.MEMBER,
      user_uuid: userUuid,
    });
    onCloseDueNavigation();
  };

  return { handleInvite };
};
