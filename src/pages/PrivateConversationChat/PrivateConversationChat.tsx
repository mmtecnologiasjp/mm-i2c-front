import { Chat } from '../../components/Chat';
import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';
import { MessageInput } from '../../components/MessageInput';

export function PrivateConversationChat() {
  return (
    <div className="flex-1">
      <ChatContainer>
        <ChatBanner />
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
