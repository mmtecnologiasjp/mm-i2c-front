import { useInviteToGroup } from '../../hooks/useInviteToGroup';
import { TypeaheadUserEmailInput } from '../TypeaheadUserEmailInput';

export function InviteMemberModalContent({
  onCloseDueNavigation,
}: {
  onCloseDueNavigation: () => void;
}) {
  const { handleInvite } = useInviteToGroup(onCloseDueNavigation);

  return (
    <div>
      <h3>Invite a person to your group</h3>
      <div className="divider"></div>
      <TypeaheadUserEmailInput onSend={handleInvite} />
    </div>
  );
}
