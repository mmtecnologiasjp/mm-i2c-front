import { BsFillSendPlusFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUserPrivateConversations } from '../../hooks/useUserPrivateConversations';
import { HStack } from '../HStack';
import { InviteFriend } from '../InviteFriend';
import { NavBarList } from '../NavBarList';

export function Test() {
  return <li>hello</li>;
}

export function PrivateConversations() {
  const { privateConversationsUsers } = useUserPrivateConversations();
  const navigate = useNavigate();
  const location = useLocation();
  const [, , uuid] = location.pathname.split('/');

  const handleNavigation = (uuid: string) => {
    return navigate(`/privateConversation/${uuid}`);
  };

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
