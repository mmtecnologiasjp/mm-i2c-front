import axios from 'axios';

import { TokenResponse } from '../../hooks/sso/types';
import { OAuthTokenBodyParams } from './types';

export type BaseSSOApiParams = {
  baseUrl: string;
  accessToken?: string;
};

export class SSOApi {
  private baseUrl: string;
  private readonly accessToken: string | undefined;

  constructor({ baseUrl, accessToken }: BaseSSOApiParams) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  async get(endpoint: string, headers?: any) {
    if (this.baseUrl.endsWith('/')) {
      throw new Error('The SSO service base URL must not end in a slash (/).');
    }

    const response = await axios.get(this.baseUrl + endpoint, {
      headers: {
        ...headers,
      },
    });

    return response.data;
  }

  async post<T>(endpoint: string, body: T) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('The SSO api could not completed the request.');
    }

    return response.json();
  }

  async oauthToken(body: OAuthTokenBodyParams): Promise<TokenResponse> {
    const data = await this.post('/oauth/token', body);

    return data;
  }

  async getUserInfo() {
    const data = await this.get('/api/user', {
      Authorization: `Bearer ${this.accessToken}`,
    });

    return data;
  }

  async getRoles() {
    const data = await this.get('/admin/roles', {
      Authorization: `Bearer ${this.accessToken}`,
    });

    return data;
  }
}
