import { User } from '../useUserQuery/types';

export interface UserPrivateConversations extends User {
  privateConversationUuid: string;
}
