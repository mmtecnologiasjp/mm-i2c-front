import { useState } from 'react';

import { useUserGroupsQuery } from '../../hooks/useUserGroupsQuery';
import { useUserPrivateConversationsQuery } from '../../hooks/useUserPrivateConversations';
import { HStack } from '../HStack';

export function SearchModalContent() {
  const { groups } = useUserGroupsQuery();
  const { privateConversationsUsers } = useUserPrivateConversationsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <h3 className="text-xl font-larsseit">Search</h3>
      <input
        placeholder="Search for groups and privacd te conversations"
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
              <HStack>
                <img src={group.image_url} alt="" className="w-8" />
                <p className="font-bold">{group.name}</p>
                <p className="opacity-60 w-[55%] truncate">{group.description}</p>
              </HStack>
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
              <HStack>
                <img
                  src={user.avatar_url ?? ''}
                  className="w-8 rounded-full"
                  alt={`${user.first_name} avatar`}
                />
                <p className="font-bold">{user.first_name}</p>
              </HStack>
            </li>
          ))}
      </ul>
    </>
  );
}
