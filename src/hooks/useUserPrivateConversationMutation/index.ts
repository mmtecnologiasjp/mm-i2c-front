import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { privateConversationsQueryKey } from '../useUserPrivateConversations';
import { UserPrivateConversations } from '../useUserPrivateConversations/types';

const createPrivateConversation = async ({
  from_uuid,
  to_uuid,
}: {
  from_uuid: string;
  to_uuid: string;
}) => {
  const response = await api.post('/private-conversations', {
    from_uuid,
    to_uuid,
  });

  return response.data;
};

export const useUserPrivateConversationMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPrivateConversation,
    mutationKey: ['private_conversation_mutation'],
    onSuccess: (newData: UserPrivateConversations) => {
      queryClient.setQueryData<UserPrivateConversations[]>(
        [privateConversationsQueryKey],
        (oldData) => {
          return oldData ? [...oldData, newData] : [];
        },
      );
    },
  });

  const executeMutation = ({
    from_uuid,
    to_uuid,
  }: {
    from_uuid: string;
    to_uuid: string;
  }) => {
    mutate({ from_uuid, to_uuid });
  };

  return { executeMutation };
};
