export interface SSOProviderProps {
  children: React.ReactNode;
  ssoServiceBaseURL: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  grant_type: string;
  scope: string;
  tokenDataKey: string;
}

export type SSOContextData = Omit<SSOProviderProps, 'children'>;
