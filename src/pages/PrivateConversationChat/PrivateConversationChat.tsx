import { Chat } from '../../components/Chat';
import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';
import { MessageInput } from '../../components/MessageInput';
import { useOtherUserOnPrivateConversation } from '../../store/useOtherUserOnPrivateConversation';

export function PrivateConversationChat() {
  const { otherUser } = useOtherUserOnPrivateConversation();

  return (
    <div className="flex-1">
      <ChatContainer>
        {otherUser && (
          <ChatBanner imageUrl={otherUser.avatar_url ?? ''} name={otherUser.first_name}>
            <p>a</p>
          </ChatBanner>
        )}
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
