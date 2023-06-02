import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { v4 } from 'uuid';

import { useUser } from '../../store/useUser';
import { socket } from '../useCreateMessage';
import { CreateMessageDTO } from '../useCreateMessage/types';
import { useIsGroupRoute } from '../useIsGroupRoute';
import {
  MessageWithSender,
  PrivateConversation,
} from '../usePrivateConversationQuery/types';
import { useRouteUUID } from '../useRouteUUID';
import { GroupWithMessage } from '../useUserGroupsQuery/types';

export const useNewWebSocketMessage = () => {
  const { isGroupRoute } = useIsGroupRoute();
  const queryClient = useQueryClient();
  const { uuid } = useRouteUUID();
  const { user } = useUser();

  const eventListener = (message: MessageWithSender) => {
    const keyBasedOnRoute = isGroupRoute ? 'group' : 'private_conversation';
    if (message.private_conversation_uuid !== uuid) return;

    const queryKey = [keyBasedOnRoute, uuid];
    console.count();
    console.log('triggered', message.content);
    queryClient.cancelQueries({ queryKey: [queryKey] });

    const previousData = queryClient.getQueryData<PrivateConversation | GroupWithMessage>(
      queryKey,
    );

    if (!previousData?.messages || !user) return [];

    const updatedData: PrivateConversation | GroupWithMessage = {
      ...previousData,
      messages: [
        ...previousData.messages,
        {
          content: message.content,
          sender_uuid: message.sender_uuid,
          group_uuid: message.group_uuid ?? null,
          private_conversation_uuid: message.private_conversation_uuid ?? null,
          uuid: message.uuid,
          created_at: message.created_at,
          deleted_at: message.deleted_at,
          updated_at: message.updated_at,
          sender: message.sender,
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
