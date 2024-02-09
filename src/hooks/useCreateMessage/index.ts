import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';

import { api } from '../../services/api';
import { useUser } from '../../store/useUser';
import { useIsGroupRoute } from '../useIsGroupRoute';
import { PrivateConversation } from '../usePrivateConversationQuery/types';
import { GroupWithMessage } from '../useUserGroupsQuery/types';
import { CreateMessageDTO } from './types';

const createMessage = async ({
  content,
  group_uuid,
  private_conversation_uuid,
  sender_uuid,
  type = 'text',
}: CreateMessageDTO) => {
  const res = await api.post('/messages', {
    content,
    group_uuid,
    private_conversation_uuid,
    sender_uuid,
    type,
  });

  return res.data;
};

export const socket = io(import.meta.env.VITE_SOCKET_IO_SERVER);

export const useCreateMessage = () => {
  const { mutate } = useMutation({
    mutationFn: createMessage,
    mutationKey: ['create_message_mutation'],
    onSuccess: (_, variables) => {
      socket.emit('send-message', variables);
    },
  });

  return mutate;
};
