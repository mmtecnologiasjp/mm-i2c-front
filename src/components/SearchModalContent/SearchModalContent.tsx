/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { groupImageDefault } from '../../constants/images_template';
import { useUserGroupsQuery } from '../../hooks/useUserGroupsQuery';
import { useUserPrivateConversationsQuery } from '../../hooks/useUserPrivateConversations';
import { HStack } from '../HStack';

export function SearchModalContent({
  onCloseDueNavigation,
}: {
  onCloseDueNavigation: () => void;
}) {
  const { groups } = useUserGroupsQuery();
  const { privateConversationsUsers } = useUserPrivateConversationsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <h3 className="text-xl font-larsseit">Search</h3>
      <input
        placeholder="Search for groups and private conversations"
        type="text"
        className="input input-bordered w-full h-8 placeholder:text-gray-600 my-4"
        title="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="divider">Groups</div>
      <ul className="menu">
        {groups
          ?.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((group) => (
            <li key={group.uuid}>
              <Link to={`/group/${group.uuid}`} onClick={onCloseDueNavigation}>
                <HStack className="items-center space-x-4">
                  <img
                    src={group.image_url || groupImageDefault}
                    alt=""
                    className="w-8 rounded-full"
                  />
                  <p className="font-bold ">{group.name}</p>
                  <p className="opacity-60 w-[55%] truncate">{group.description}</p>
                </HStack>
              </Link>
            </li>
          ))}
      </ul>
      <div className="divider">Private Conversations</div>
      <ul className="menu">
        {privateConversationsUsers
          ?.filter((user) =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((user) => (
            <li key={user.uuid}>
              <Link
                to={`/privateConversation/${user.privateConversationUuid}`}
                onClick={onCloseDueNavigation}
              >
                <HStack className="items-center space-x-4">
                  <img
                    src={user.avatar_url ?? ''}
                    className="w-8 rounded-full"
                    alt={`${user.first_name} avatar`}
                  />
                  <p className="font-bold">{user.first_name}</p>
                </HStack>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
