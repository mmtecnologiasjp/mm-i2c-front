import { User } from '../useUserQuery/types';

interface Message {
  uuid: string;
  content: string;
  group_uuid: string | null;
  private_conversation_uuid: string | null;
  sender_uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  sender: User;
}

export interface PrivateConversation {
  uuid: string;
  from_uuid: string;
  to_uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  messages: Message[] | undefined;
  privateConversationUuid: string;
}
