import { Message } from '../usePrivateConversationQuery/types';
import { User } from '../useUserQuery/types';

export interface Group {
  uuid: string;
  name: string;
  description: string;
  image_url: string;
  creator_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface GroupWithMessage extends Group {
  messages: Message[];
}
