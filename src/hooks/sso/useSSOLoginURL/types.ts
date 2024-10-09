export interface UseSSOUrlOptions {
  authorizationQueryParams: {
    client_id: string;
    redirect_uri: string;
    scope: string;
    // response_type?: string;
    // state?: string;
  };
  ssoServiceBaseURL: string;
}
