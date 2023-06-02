import { useParams } from 'react-router-dom';

import { Chat } from '../../components/Chat';
import { ChatBanner } from '../../components/ChatBanner';
import { ChatContainer } from '../../components/ChatContainer';
import { GroupBannerOptions } from '../../components/GroupBannerOptions';
import { MessageInput } from '../../components/MessageInput';
import { groupImageDefault } from '../../constants/images_template';
import { useGroupQuery } from '../../hooks/useGroupQuery';
import { useOnBannerIconClicked } from '../../hooks/useOnBannerIconClicked';

export function GroupChat() {
  const { uuid } = useParams();
  const { group } = useGroupQuery(uuid) ?? {};
  const { onNavigate } = useOnBannerIconClicked();

  return (
    <div className="flex-1">
      <ChatContainer>
        {group && (
          <ChatBanner
            imageUrl={group?.image_url || groupImageDefault}
            name={group.name}
            onIconClicked={onNavigate}
          >
            <GroupBannerOptions />
          </ChatBanner>
        )}
        <Chat />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}
