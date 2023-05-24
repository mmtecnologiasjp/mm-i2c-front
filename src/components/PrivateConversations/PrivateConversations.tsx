import { useNavigate, useParams } from 'react-router-dom';

import { useUserPrivateConversations } from '../../hooks/useUserPrivateConversations';
import { NavBarList } from '../NavBarList';

export function PrivateConversations() {
  const { privateConversationsUsers } = useUserPrivateConversations();
  const { uuid } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (uuid: string) => {
    return navigate(`/privateConversations/${uuid}`);
  };

  return (
    <div>
      <NavBarList listName="Private Conversations">
        {privateConversationsUsers?.map((privateConversationUser) => (
          <NavBarList.Item
            uuid={privateConversationUser.uuid}
            isActive={privateConversationUser?.uuid === uuid}
            key={privateConversationUser.uuid}
            name={privateConversationUser.first_name}
            imageUrl={privateConversationUser.avatar_url}
            onItemClicked={handleNavigation}
          />
        ))}
      </NavBarList>
    </div>
  );
}
