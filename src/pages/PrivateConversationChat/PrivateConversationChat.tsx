import { useNavigate } from 'react-router-dom';

import { Chat } from '../../components/Chat';
import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';
import { MessageInput } from '../../components/MessageInput';
import { useOnBannerIconClicked } from '../../hooks/useOnBannerIconClicked';
import { useRouteName } from '../../hooks/useRouteName';
import { useRouteUUID } from '../../hooks/useRouteUUID';
import { useOtherUserOnPrivateConversation } from '../../store/useOtherUserOnPrivateConversation';

export function PrivateConversationChat() {
  const { otherUser } = useOtherUserOnPrivateConversation();
  const { onNavigate } = useOnBannerIconClicked();

  return (
    <div className="flex-1">
      <ChatContainer>
        {otherUser && (
          <ChatBanner
            imageUrl={otherUser.avatar_url ?? ''}
            name={otherUser.first_name}
            onIconClicked={onNavigate}
          >
            <></>
          </ChatBanner>
        )}
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
