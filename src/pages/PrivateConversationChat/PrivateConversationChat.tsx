import { useParams } from 'react-router-dom';

import { usePrivateConversationQuery } from '../../hooks/usePrivateConversationQuery';

export function PrivateConversationChat() {
  const { uuid } = useParams();
  const { privateConversation } = usePrivateConversationQuery(uuid);

  return <div></div>;
}
