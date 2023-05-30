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
            sender_image_url={message.sender.avatar_url ?? ''}
            sender_name={message.sender.first_name + ' ' + message.sender.last_name}
            sent_at={message.created_at}
            isLastMessage={index + 1 === originalArray.length}
            isFirstMessage={true}
          />
        ))}
      </div>
    </VStack>
  );
}
