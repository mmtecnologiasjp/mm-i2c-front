import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRouteUUID } from '../../hooks/useRouteUUID';
import { useUserPrivateConversationsQuery } from '../../hooks/useUserPrivateConversations';
import { useOtherUserOnPrivateConversation } from '../../store/useOtherUserOnPrivateConversation';
import { NavBarList } from '../NavBarList';

export function PrivateConversations() {
  const { privateConversationsUsers } = useUserPrivateConversationsQuery();
  const navigate = useNavigate();
  const { uuid } = useRouteUUID();
  const {
    actions: { storeOtherUser },
  } = useOtherUserOnPrivateConversation();
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleNavigation = (uuid: string) => {
    const userClicked = privateConversationsUsers?.find(
      (user) => user.privateConversationUuid === uuid,
    );

    if (!userClicked) return;

    storeOtherUser(userClicked);

    return navigate(`/privateConversation/${uuid}/chat`);
  };

  useEffect(() => {
    if (!privateConversationsUsers?.length || hasLoaded) return;

    storeOtherUser(privateConversationsUsers?.[0]);
    navigate(
      `/privateConversation/${privateConversationsUsers?.[0].privateConversationUuid}`,
    );
    setHasLoaded(true);
  }, [privateConversationsUsers, hasLoaded]);

  return (
    <div>
      <NavBarList listName="Private Conversations">
        {privateConversationsUsers?.map((privateConversationUser) => {
          const isActive = privateConversationUser.privateConversationUuid === uuid;

          return (
            <NavBarList.Item
              imageUrl={
                privateConversationUser.avatar_url ??
                'https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg'
              }
              key={privateConversationUser.uuid}
              onItemClicked={handleNavigation}
              name={privateConversationUser.first_name}
              isActive={isActive}
              uuid={privateConversationUser.privateConversationUuid}
            />
          );
        })}
      </NavBarList>
    </div>
  );
}
