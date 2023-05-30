import { FormEvent, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { useParams } from 'react-router-dom';

import { useCreateMessage } from '../../hooks/useCreateMessage';
import { usePrivateConversationQuery } from '../../hooks/usePrivateConversationQuery';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const { uuid } = useParams();
  const { privateConversation } = usePrivateConversationQuery(uuid);
  const mutate = useCreateMessage();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    mutate({
      content: message,
      group_uuid: null,
      private_conversation_uuid: uuid ?? null,
      sender_uuid: import.meta.env.VITE_USER_MOCK_UUID,
      type: 'text',
    });
    setMessage('');
  };

  return (
    <div className="bg-gray-800">
      <form action="" onSubmit={handleSendMessage}>
        <label className="input-group">
          <input
            type="text"
            className="bg-gray-800 p-3 focus:outline-none focus:shadow-outline w-full placeholder:text-gray-600"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span className="bg-transparent">
            {message ? (
              <BsFillSendFill
                className="text-white cursor-pointer"
                onClick={handleSendMessage}
              />
            ) : (
              <ImAttachment className="text-white" />
            )}
          </span>
        </label>
      </form>
    </div>
  );
}
