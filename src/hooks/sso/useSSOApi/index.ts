import { useSSOContext } from '../../../contexts/sso-provider';
import { BaseSSOApiParams, SSOApi } from '../../../services/sso/ssoApi';
import { TokenResponse } from '../types';

export function useSSOApi() {
  const { ssoServiceBaseURL, tokenDataKey } = useSSOContext();
  const sessionStorageTokenData = sessionStorage.getItem(tokenDataKey);

  function mountApiParams() {
    if (!sessionStorageTokenData) {
      return <BaseSSOApiParams>{
        baseUrl: ssoServiceBaseURL,
      };
    }

    const { access_token } = JSON.parse(sessionStorageTokenData) as TokenResponse;

    return <BaseSSOApiParams>{
      baseUrl: ssoServiceBaseURL,
      accessToken: access_token,
    };
  }

  return {
    ssoApi: new SSOApi(mountApiParams()),
  };
}
