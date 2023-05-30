import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';

export function GroupChat() {
  return (
    <div className="flex-1">
      <ChatContainer>
        <ChatBanner />
      </ChatContainer>
    </div>
  );
}
