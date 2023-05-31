import { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillSendPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { useUserByEmailQuery } from '../../hooks/useUserByEmailQuery';
import { useUserPrivateConversationMutation } from '../../hooks/useUserPrivateConversationMutation';
import { useUserPrivateConversationsQuery } from '../../hooks/useUserPrivateConversations';
import { User } from '../../hooks/useUserQuery/types';
import { useOtherUserOnPrivateConversation } from '../../store/useOtherUserOnPrivateConversation';
import { useUser } from '../../store/useUser';
import { HStack } from '../HStack';
import { UserCardSearchedOnInvite } from '../UserCardSearchedOnInvite';

export function InvitePersonModalContent({
  onCloseDueNavigation,
}: {
  onCloseDueNavigation: () => void;
}) {
  const [userSelected, setUserSelected] = useState({} as User | null);
  const [email, setEmail] = useState('');
  const {
    enableQuery,
    refetch,
    users,
    disableQuery,
    enablePrevioudata,
    disablePreviousData,
  } = useUserByEmailQuery(email);
  const { executeMutation } = useUserPrivateConversationMutation();
  const { privateConversationsUsers } = useUserPrivateConversationsQuery();
  const navigate = useNavigate();
  const [userSearched, setUserSearched] = useState(false);
  const {
    actions: { storeOtherUser },
  } = useOtherUserOnPrivateConversation();
  const { user } = useUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    setUserSearched(false);
    if (!email) return disablePreviousData();
    enablePrevioudata();

    const delayDebounceFn = setTimeout(() => {
      enableQuery();

      refetch().finally(() => {
        disableQuery();
        setUserSearched(true);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  const handleRemoveUserSelected = () => {
    setUserSelected(null);
  };

  const handleSetUserSelected = (User: User) => {
    setUserSelected(User);
  };

  const resetStates = () => {
    onCloseDueNavigation();
    handleRemoveUserSelected();
  };

  const handleInvite = () => {
    if (!userSelected || !user) return;

    const userAlreadyInConversation = privateConversationsUsers?.find((item) => {
      return item.uuid === userSelected.uuid;
    });

    if (userAlreadyInConversation) {
      resetStates();
      storeOtherUser(userAlreadyInConversation);
      return navigate(
        `/privateConversation/${userAlreadyInConversation.privateConversationUuid}`,
      );
    }

    executeMutation({
      from_uuid: user.uuid,
      to_uuid: userSelected.uuid,
    });
    resetStates();
  };

  return (
    <div>
      <h3 className="modal-header">Invite a person</h3>
      <div className="divider"></div>
      <div className="input-group">
        {userSelected?.email ? (
          <HStack className="input input-bordered w-full focus:outline-none">
            <HStack className="items-center bg-gray-900 my-1 p-4 rounded-lg space-x-4">
              <img
                src={
                  userSelected.avatar_url ??
                  'https://www.shareicon.net/data/2016/05/24/770137_man_512x512.png'
                }
                alt=""
                className="w-8 rounded-full"
              />
              <p>{userSelected.email}</p>
              <button type="button" className="w-8" onClick={handleRemoveUserSelected}>
                x
              </button>
            </HStack>
          </HStack>
        ) : (
          <input
            type="text"
            placeholder="User email"
            className="input input-bordered w-full focus:outline-none"
            value={email}
            onChange={handleEmailChange}
          />
        )}
        <div title="Send email" className="bg-gray-900 p-3 ">
          <AiOutlineMail className="text-2xl" />
        </div>
      </div>
      <div>
        <div
          className={`border-1 mt-1 py-4 px-10 sm:px-0 ${
            userSelected?.email ? 'hidden' : ''
          }`}
        >
          {userSearched && users?.length
            ? users?.map((user) => (
                <UserCardSearchedOnInvite
                  onClick={handleSetUserSelected}
                  key={user.uuid}
                  user={user}
                />
              ))
            : null}
          {userSearched && !users?.length && (
            <div className="p-2">
              <p className="text-gray-500 font-larsseit text-xl">No users found!</p>
            </div>
          )}
        </div>
      </div>
      <HStack className="justify-end pr-2 mt-8 space-x-4">
        <button
          type="button"
          className={`btn ${!userSelected?.email && 'btn-disabled'} space-x-4`}
          onClick={handleInvite}
        >
          <p>Send</p>
          <BsFillSendPlusFill className="text-2xl" />
        </button>
      </HStack>
    </div>
  );
}
