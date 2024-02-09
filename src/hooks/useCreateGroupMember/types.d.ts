import { Role } from '../useGroupMembersQuery/enum';

export interface CreateGroupMemberBody {
  group_uuid: string;
  user_uuid: string;
  role: Role;
}
