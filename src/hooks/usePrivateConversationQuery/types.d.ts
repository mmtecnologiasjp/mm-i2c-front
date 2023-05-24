interface Message {
  uuid: string;
  content: string;
  group_uuid: string | null;
  private_conversation_uuid: string | null;
  sender_uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface PrivateConversation {
  uuid: string;
  from_uuid: string;
  to_uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  messages: Message[];
  privateConversationUuid: string;
}
