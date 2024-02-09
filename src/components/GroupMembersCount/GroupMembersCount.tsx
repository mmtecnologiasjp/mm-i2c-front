import { FiUsers } from 'react-icons/fi';

import { useGroupMembersByGroupQuery } from '../../hooks/useGroupMembersQuery';
import { useRouteUUID } from '../../hooks/useRouteUUID';
import { useKeyToRerunGroupBadgeMembers } from '../../store/useKeyToRerunGroupBadgeMembers';

export function GroupMembersCount() {
  const { uuid } = useRouteUUID();
  const { groupMembers } = useGroupMembersByGroupQuery(uuid);
  const { key } = useKeyToRerunGroupBadgeMembers();

  const groupMembersCount = groupMembers?.length.toString().padStart(2, '0');

  return (
    <>
      <div
        key={key}
        className="badge-outline badge-success mt-0.5 space-x-2 btn btn-sm hover:bg-transparent hover:border-success"
      >
        <FiUsers />
        <p className="font-larsseit mt-1">{groupMembersCount} / 100</p>
      </div>
    </>
  );
}
