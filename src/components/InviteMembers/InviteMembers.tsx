import { AiOutlineUserAdd } from 'react-icons/ai';

import { useDisclose } from '../../hooks/useDisclose';
import { InviteMemberModalContent } from '../InviteMemberModalContent';
import { Modal } from '../Modal';

export function InviteMembers() {
  const [isOpen, onToggle] = useDisclose();

  return (
    <>
      <button className="btn gap-2 btn-outline btn-sm" type="button" onClick={onToggle}>
        <AiOutlineUserAdd className="text-lg" />
        Invite members
      </button>
      <Modal open={isOpen} disableClickOutside={!isOpen} onClose={onToggle}>
        <InviteMemberModalContent onCloseDueNavigation={onToggle} />
      </Modal>
    </>
  );
}
