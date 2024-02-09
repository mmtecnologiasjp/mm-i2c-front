import { useInviteToPrivateConversation } from '../../hooks/useInviteToPrivateConversation';
import { TypeaheadUserEmailInput } from '../TypeaheadUserEmailInput';

export function InvitePersonModalContent({
  onCloseDueNavigation,
}: {
  onCloseDueNavigation: () => void;
}) {
  const handleInvite = useInviteToPrivateConversation(onCloseDueNavigation);

  return (
    <div>
      <h3 className="modal-header">Invite a person</h3>
      <div className="divider"></div>
      <TypeaheadUserEmailInput onSend={handleInvite} />
    </div>
  );
}
