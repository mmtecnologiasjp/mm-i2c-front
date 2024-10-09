import { TokenResponse } from '../types';

export interface UseSSOCallbackOptions {
  authorizationBodyParams: {
    client_id: string;
    client_secret: string;
    grant_type: string;
    redirect_uri: string;
  };
  ssoServiceBaseURL: string;
  onTokenResponse?: (tokenResponse: TokenResponse) => void;
}
