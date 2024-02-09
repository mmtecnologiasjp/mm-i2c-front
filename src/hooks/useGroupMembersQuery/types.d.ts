import { Role } from './enum';

export interface GroupMember {
  uuid: string;
  user_uuid: string;
  group_uuid: string;
  role: Role;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
