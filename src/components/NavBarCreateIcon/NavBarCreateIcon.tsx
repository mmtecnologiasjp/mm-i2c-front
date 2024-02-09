/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AiOutlineClose, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

import { useDisclose } from '../../hooks/useDisclose';
import { CreateGroupModalContent } from '../CreateGroupModalContent';
import { HStack } from '../HStack';
import { InvitePersonModalContent } from '../InvitePersonModalContent';
import { Modal } from '../Modal';
import { VStack } from '../VStack';

const userAddAndUserGroupAddClassNames = {
  icon: 'text-2xl cursor-pointer',
  wrapper: 'bg-blue-950 p-2 rounded-full',
};

export function NavBarCreateIcon() {
  const [isOptionsOpen, onToggleOptions] = useDisclose();
  const [isCreateGroupOpen, onToggleCreateGroup] = useDisclose();
  const [isInvitePersonOpen, onToggleInvitePerson] = useDisclose();

  const openInvitePersonModal = () => {
    onToggleInvitePerson();
    onToggleOptions();
  };

  const onCreateGroupOpen = () => {
    onToggleCreateGroup();
    onToggleOptions();
  };

  const onSwapClick = () => {
    onToggleOptions();
  };

  return (
    <>
      <HStack className="h-24 justify-end items-end absolute bottom-16 right-4">
        {isOptionsOpen && (
          <VStack className="mr-2 space-y-2">
            <div
              className={userAddAndUserGroupAddClassNames.wrapper}
              onClick={openInvitePersonModal}
            >
              <AiOutlineUserAdd
                className={userAddAndUserGroupAddClassNames.icon}
                onClick={openInvitePersonModal}
              />
            </div>
            <div
              className={userAddAndUserGroupAddClassNames.wrapper}
              onClick={onCreateGroupOpen}
            >
              <AiOutlineUsergroupAdd
                className={userAddAndUserGroupAddClassNames.icon}
                onClick={onCreateGroupOpen}
              />
            </div>
          </VStack>
        )}
        <div className="bg-gray-700 opacity-70 p-2 rounded-full mr-4 cursor-pointer">
          {!isOptionsOpen && !isInvitePersonOpen && !isCreateGroupOpen ? (
            <BsPlusLg className="text-white text-3xl" onClick={onSwapClick} />
          ) : (
            <AiOutlineClose
              className="text-white text-3xl cursor-pointer rounded-full"
              onClick={onSwapClick}
            />
          )}
        </div>
      </HStack>
      <Modal
        open={isInvitePersonOpen}
        onClose={onToggleInvitePerson}
        disableClickOutside={!isInvitePersonOpen}
      >
        <InvitePersonModalContent onCloseDueNavigation={onToggleInvitePerson} />
      </Modal>
      <Modal
        open={isCreateGroupOpen}
        disableClickOutside={!isCreateGroupOpen}
        onClose={onToggleCreateGroup}
      >
        <CreateGroupModalContent onCloseDueNavigation={onToggleCreateGroup} />
      </Modal>
    </>
  );
}
