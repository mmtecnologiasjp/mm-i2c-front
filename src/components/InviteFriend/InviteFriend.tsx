import { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillSendPlusFill } from 'react-icons/bs';

import { useUserByEmailQuery } from '../../hooks/useUserByEmailQuery';
import { useUserPrivateConversationMutation } from '../../hooks/useUserPrivateConversationMutation';
import { User } from '../../hooks/useUserQuery/types';
import { HStack } from '../HStack';

export function InviteFriend() {
  const [email, setEmail] = useState('');
  const {
    enableQuery,
    refetch,
    users,
    disableQuery,
    enablePrevioudata,
    disablePreviousData,
  } = useUserByEmailQuery(email);
  const [userSelected, setUserSelected] = useState({} as User | null);
  const { executeMutation } = useUserPrivateConversationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSetUserSelected = (User: User) => {
    setUserSelected(User);
  };

  const removeUserSelected = () => {
    setUserSelected(null);
  };

  const handleInvite = () => {
    if (!userSelected) return;

    executeMutation({
      from_uuid: import.meta.env.VITE_USER_MOCK_UUID,
      to_uuid: userSelected.uuid,
    });
    alert('created!');
  };

  return (
    <label htmlFor="my-modal">
      <BsFillSendPlusFill />
      <label
        htmlFor="my-modal"
        className="font-larsseit text-white btn bg-transparent border-none hover:border-none hover:bg-transparent"
      >
        Invite a friend
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="1">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Invite a person</h3>
          <div className="divider"></div>

          <div className="form-control">
            <div className="input-group">
              {!userSelected?.email ? (
                <input
                  type="text"
                  placeholder="User email"
                  className="input input-bordered w-full focus:outline-none"
                  value={email}
                  onChange={handleChange}
                />
              ) : (
                <div className="input input-bordered w-full focus:outline-none flex items-center font-larsseit">
                  <HStack className="bg-gray-900 items-center space-x-3 pr-6 py-1 rounded-lg">
                    <img
                      src={
                        userSelected.avatar_url ??
                        'https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg'
                      }
                      className="w-8 rounded-full ml-4"
                      alt=""
                    />
                    <p className="w-48 truncate">
                      {userSelected.first_name} {userSelected.last_name}
                    </p>
                    <button onClick={removeUserSelected}>x</button>
                  </HStack>
                </div>
              )}
              <button type="button" title="Send email" className="btn btn-square">
                <AiOutlineMail className="text-2xl" />
              </button>
            </div>
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
          <div></div>
        </label>
      </label>
    </label>
  );
}
