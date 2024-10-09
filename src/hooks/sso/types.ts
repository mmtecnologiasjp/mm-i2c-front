export interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface ErrorResponse {
  error: string;
  error_description: string;
  hint: string;
  message: string;
}
