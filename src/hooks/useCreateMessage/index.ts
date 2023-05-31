import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
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

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const { uuid } = useParams();
  const { user } = useUser();
  const { isGroupRoute } = useIsGroupRoute();

  const { mutate } = useMutation({
    mutationFn: createMessage,
    mutationKey: ['create_message_mutation'],
    onMutate: (variables) => {
      const keyBasedOnRoute = isGroupRoute ? 'group' : 'private_conversation';
      const privateConversationKeys = [keyBasedOnRoute, uuid];
      const data = queryClient.getQueryData<PrivateConversation | GroupWithMessage>(
        privateConversationKeys,
      );

      if (!data?.messages || !user) return;

      const updatedData: PrivateConversation | GroupWithMessage = {
        ...data,
        messages: [
          ...data.messages,
          {
            content: variables.content,
            sender_uuid: variables.sender_uuid,
            group_uuid: variables.group_uuid ?? null,
            private_conversation_uuid: variables.private_conversation_uuid ?? null,
            uuid: v4(),
            created_at: new Date().toString(),
            deleted_at: null,
            updated_at: new Date().toString(),
            sender: user,
          },
        ],
      };

      queryClient.setQueryData(privateConversationKeys, updatedData);
    },
  });

  return mutate;
};
