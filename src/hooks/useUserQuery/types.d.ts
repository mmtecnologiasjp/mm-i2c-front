enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User {
  uuid: string;
  first_name: string;
  last_name: string | undefined;
  username: string;
  email: string;
  status: StatusEnum;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
