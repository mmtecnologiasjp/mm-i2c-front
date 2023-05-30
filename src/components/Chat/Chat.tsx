import { useParams } from 'react-router-dom';

import { usePrivateConversationQuery } from '../../hooks/usePrivateConversationQuery';
import { Message } from '../Message';
import { VStack } from '../VStack';

export function Chat() {
  const { uuid } = useParams();
  const { privateConversation } = usePrivateConversationQuery(uuid);

  return (
    <VStack className="h-[calc(100vh-14rem)]">
      <div className="mt-12 space-y-4">
        {privateConversation?.messages?.map((message, index, originalArray) => (
          <Message
            key={message.uuid}
            content={message.content}
            senderImageUrl={message.sender.avatar_url ?? ''}
            senderName={message.sender.first_name + ' ' + message.sender.last_name}
            sentAt={message.created_at}
            isLastMessage={index + 1 === originalArray.length}
            isFirstMessage={true}
          />
        ))}
      </div>
    </VStack>
  );
}
