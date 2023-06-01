import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { v4 } from 'uuid';

import { useUser } from '../../store/useUser';
import { socket } from '../useCreateMessage';
import { CreateMessageDTO } from '../useCreateMessage/types';
import { useIsGroupRoute } from '../useIsGroupRoute';
import { PrivateConversation } from '../usePrivateConversationQuery/types';
import { useRouteUUID } from '../useRouteUUID';
import { GroupWithMessage } from '../useUserGroupsQuery/types';

export const useNewWebSocketMessage = () => {
  const { isGroupRoute } = useIsGroupRoute();
  const queryClient = useQueryClient();
  const { uuid } = useRouteUUID();
  const { user } = useUser();

  const eventListener = (message: CreateMessageDTO) => {
    console.log(message);
    const keyBasedOnRoute = isGroupRoute ? 'group' : 'private_conversation';
    const queryKey = [keyBasedOnRoute, uuid];
    queryClient.cancelQueries({ queryKey: [queryKey] });

    const previousData = queryClient.getQueryData<PrivateConversation | GroupWithMessage>(
      queryKey,
    );

    if (!previousData?.messages || !user) return;

    const updatedData: PrivateConversation | GroupWithMessage = {
      ...previousData,
      messages: [
        ...previousData.messages,
        {
          content: message.content,
          sender_uuid: message.sender_uuid,
          group_uuid: message.group_uuid ?? null,
          private_conversation_uuid: message.private_conversation_uuid ?? null,
          uuid: v4(),
          created_at: new Date().toString(),
          deleted_at: null,
          updated_at: new Date().toString(),
          sender: user,
        },
      ],
    };

    queryClient.setQueryData(queryKey, updatedData);
  };

  useEffect(() => {
    socket.on('server-message', eventListener);

    return () => {
      socket.off('server-message', eventListener);
    };
  }, []);
};
