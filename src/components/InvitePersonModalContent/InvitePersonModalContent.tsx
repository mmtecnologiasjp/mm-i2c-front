import { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillSendPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { useUserByEmailQuery } from '../../hooks/useUserByEmailQuery';
import { useUserPrivateConversationMutation } from '../../hooks/useUserPrivateConversationMutation';
import { useUserPrivateConversationsQuery } from '../../hooks/useUserPrivateConversations';
import { User } from '../../hooks/useUserQuery/types';
import { HStack } from '../HStack';

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (!email) return disablePreviousData();
    enablePrevioudata();

    const delayDebounceFn = setTimeout(() => {
      enableQuery();

      refetch().finally(() => {
        disableQuery();
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
    if (!userSelected) return;

    const userAlreadyInConversation = privateConversationsUsers?.find((item) => {
      return item.uuid === userSelected.uuid;
    });

    if (userAlreadyInConversation) {
      resetStates();
      return navigate(
        `/privateConversation/${userAlreadyInConversation.privateConversationUuid}`,
      );
    }

    executeMutation({
      from_uuid: import.meta.env.VITE_USER_MOCK_UUID,
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
        {users && (
          <div
            className={`border-1 mt-1 py-4 px-10 sm:px-0 ${
              userSelected?.email && 'hidden'
            }`}
          >
            {users.map((item) => (
              <HStack
                className={`border mb-2 border-gray-600 items-center rounded-md  space-x-2 p-2.5 hover:bg-gray-700 cursor-pointer  ${
                  userSelected?.email === item.email && 'bg-gray-700'
                }`}
                key={item.uuid}
                onClick={() => handleSetUserSelected(item)}
              >
                <img
                  className="w-8 rounded-full"
                  src={
                    item.avatar_url ??
                    'https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg'
                  }
                  alt={`${item.first_name} avatar`}
                />
                <p className="font-larsseit mb-0.5 w-[50%] truncate">
                  <span className="mr-1">{item.first_name}</span>
                  {item.last_name}
                </p>
                <div className="sm:flex w-[50%]">
                  <div className="tooltip w-full" data-tip={item.email}>
                    <div className="flex w-44">
                      <p className="truncate">{item.email}</p>
                    </div>
                  </div>
                </div>
              </HStack>
            ))}
          </div>
        )}
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
