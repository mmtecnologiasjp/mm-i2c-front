export interface OAuthTokenBodyParams {
  client_id: string;
  client_secret: string;
  grant_type: string;
  redirect_uri: string;
  code: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
  image_url: string;
  code: string;
  secondsRemaining: number;
  user_id: string;
}
