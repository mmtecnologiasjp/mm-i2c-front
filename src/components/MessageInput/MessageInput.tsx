import { FormEvent, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { useParams } from 'react-router-dom';

import { useCreateMessage } from '../../hooks/useCreateMessage';
import { useIsGroupRoute } from '../../hooks/useIsGroupRoute';
import { useUser } from '../../store/useUser';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const { uuid } = useParams();
  const mutate = useCreateMessage();
  const { user } = useUser();
  const { isGroupRoute } = useIsGroupRoute();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!message || !user || !uuid) return;

    mutate({
      content: message,
      group_uuid: isGroupRoute ? uuid : null,
      private_conversation_uuid: isGroupRoute ? null : uuid,
      sender_uuid: user?.uuid,
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
