import { useNavigate } from 'react-router-dom';

import { useOtherUserOnPrivateConversation } from '../../store/useOtherUserOnPrivateConversation';
import { useUser } from '../../store/useUser';
import { useUserPrivateConversationMutation } from '../useUserPrivateConversationMutation';
import { useUserPrivateConversationsQuery } from '../useUserPrivateConversations';

export const useInviteToPrivateConversation = (onCloseDueNavigation: () => void) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { privateConversationsUsers } = useUserPrivateConversationsQuery();
  const {
    actions: { storeOtherUser },
  } = useOtherUserOnPrivateConversation();
  const { executeMutation } = useUserPrivateConversationMutation();

  const handleInvite = (userInvitedUuid: string) => {
    if (!user) return;

    const userAlreadyInConversation = privateConversationsUsers?.find((item) => {
      return item.uuid === userInvitedUuid;
    });

    if (userAlreadyInConversation) {
      onCloseDueNavigation();
      storeOtherUser(userAlreadyInConversation);
      return navigate(
        `/privateConversation/${userAlreadyInConversation.privateConversationUuid}/chat`,
      );
    }

    executeMutation({
      from_uuid: user.uuid,
      to_uuid: userInvitedUuid,
    });
    onCloseDueNavigation();
  };

  return handleInvite;
};
