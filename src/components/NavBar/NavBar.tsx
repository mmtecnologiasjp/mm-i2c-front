import cs from 'classnames';
import { useState } from 'react';
import {
  AiFillPlusCircle,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

import { Groups } from '../Groups';
import { HStack } from '../HStack';
import { InvitePersonModalContent } from '../InvitePersonModalContent';
import { Modal } from '../Modal';
import { PrivateConversations } from '../PrivateConversations';
import { UserHorizontalCard } from '../UserHorizontalCard';
import { VStack } from '../VStack';

const userAddAndUserGroupAddClassNames = {
  icon: 'text-2xl cursor-pointer',
  wrapper: 'bg-blue-950 p-2 rounded-full',
};

function NavBar() {
  const [isInvitePersonModalOpen, setIsInvitePersonModalOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const onToggleInvitePersonModal = () => {
    setIsInvitePersonModalOpen((prev) => !prev);
  };

  const onToggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const openInvitePersonModal = () => {
    onToggleOptions();
    onToggleInvitePersonModal();
  };

  const plusButtonActive = cs({
    'text-green-600 scale-125': isOptionsOpen,
  });

  return (
    <nav className="drawer w-72 bg-gray-900">
      <div className="drawer-content">
        <UserHorizontalCard />
        <Groups />
        <PrivateConversations />
      </div>
      <HStack className="h-24 justify-end items-end">
        {isOptionsOpen && (
          <VStack className="mr-2 space-y-2">
            <div className={userAddAndUserGroupAddClassNames.wrapper}>
              <AiOutlineUserAdd
                className={userAddAndUserGroupAddClassNames.icon}
                onClick={openInvitePersonModal}
              />
            </div>
            <div className={userAddAndUserGroupAddClassNames.wrapper}>
              <AiOutlineUsergroupAdd
                className={userAddAndUserGroupAddClassNames.icon}
                onClick={onToggleOptions}
              />
            </div>
          </VStack>
        )}
        <AiFillPlusCircle
          className={`${plusButtonActive} text-5xl mr-4 cursor-pointer hover:scale-125 transition-transform`}
          onClick={onToggleOptions}
        />
      </HStack>
      <Modal
        open={isInvitePersonModalOpen}
        onClose={onToggleInvitePersonModal}
        disableClickOutside={!isInvitePersonModalOpen}
      >
        <InvitePersonModalContent onCloseDueNavigation={onToggleInvitePersonModal} />
      </Modal>
    </nav>
  );
}

export default NavBar;
