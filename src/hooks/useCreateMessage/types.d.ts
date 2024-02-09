export interface CreateMessageDTO {
  content: string;
  group_uuid: string | null;
  private_conversation_uuid: string | null;
  sender_uuid: string;
  type: string;
}
