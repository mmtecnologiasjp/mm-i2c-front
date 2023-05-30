import { Chat } from '../../components/Chat';
import { ChatContainer } from '../../components/ChatContainer';
import { MessageInput } from '../../components/MessageInput';
import { PrivateConversationBanner } from '../../components/PrivateConversationBanner';

export function PrivateConversationChat() {
  return (
    <div className="flex-1">
      <ChatContainer>
        <PrivateConversationBanner />
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
