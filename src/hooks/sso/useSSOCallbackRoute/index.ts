import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSSOContext } from '../../../contexts/sso-provider';
import { SSOApi } from '../../../services/sso/ssoApi';
import { OAuthTokenBodyParams } from '../../../services/sso/types';
import { useUserLoginState } from '../../../store/useUserLoginState';
import { TokenResponse } from '../types';

export enum CallBackLoginStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}
export function useSSOCallbackRoute() {
  const {
    clientId,
    clientSecret,
    grant_type,
    redirectUri,
    ssoServiceBaseURL,
    tokenDataKey,
  } = useSSOContext();
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const { logout } = useUserLoginState();
  const navigate = useNavigate();
  const [status, setStatus] = useState(CallBackLoginStatus.LOADING);

  async function getOauthTokenResponse() {
    if (!code) return;

    const oauthTokenBodyParams: OAuthTokenBodyParams = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type,
      redirect_uri: redirectUri,
      code,
    };

    const ssoApi = new SSOApi({ baseUrl: ssoServiceBaseURL });

    try {
      return await ssoApi.oauthToken(oauthTokenBodyParams);
    } catch (e) {
      logout();
      setStatus(CallBackLoginStatus.ERROR);
      navigate('/');
      throw new Error('The SSO api could not completed the oauth request.');
    }
  }

  async function handleTokenData() {
    const tokenData = await getOauthTokenResponse();

    handleOnTokenResponse(tokenData);
  }

  useEffect(() => {
    handleTokenData();
  }, []);

  function handleOnTokenResponse(tokenData: TokenResponse | undefined) {
    if (!tokenData) return;

    sessionStorage.setItem(tokenDataKey, JSON.stringify(tokenData));
    setStatus(CallBackLoginStatus.SUCCESS);
  }

  return {
    status,
  };
}
