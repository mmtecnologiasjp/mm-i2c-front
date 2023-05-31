import { useParams } from 'react-router-dom';

import { Chat } from '../../components/Chat';
import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';
import { MessageInput } from '../../components/MessageInput';
import { groupImageDefault } from '../../constants/images_template';
import { useGroupQuery } from '../../hooks/useGroupQuery';

export function GroupChat() {
  const { uuid } = useParams();
  const { group } = useGroupQuery(uuid) ?? {};

  return (
    <div className="flex-1">
      <ChatContainer>
        {group && (
          <ChatBanner
            imageUrl={group?.image_url || groupImageDefault}
            name={group.name}
          />
        )}
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
