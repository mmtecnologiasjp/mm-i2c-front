import { GroupMembersCount } from '../GroupMembersCount';
import { HStack } from '../HStack';
import { InviteMembers } from '../InviteMembers';

export function GroupBannerOptions() {
  return (
    <HStack className="h-fit items-center space-x-4">
      <InviteMembers />
      <GroupMembersCount />
    </HStack>
  );
}
