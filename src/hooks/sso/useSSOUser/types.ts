import { TokenResponse } from '../types';

export interface UseSSOOptions {
  authorizationBodyParams: {
    client_id: string;
    client_secret: string;
    grant_type: string;
    redirect_uri: string;
  };
  ssoServiceBaseURL: string;
  onTokenResponse?: (tokenResponse: TokenResponse) => void;
}

export type UserRole = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: string;
    role_id: number;
  };
};

export interface User {
  email: string;
  name: string;
  id: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  roles: UserRole[];
}
