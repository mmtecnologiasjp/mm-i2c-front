import { useSSOContext } from '../../../contexts/sso-provider';

export function useSSOLoginURL() {
  const { ssoServiceBaseURL, clientId, redirectUri, scope } = useSSOContext();
  console.log('return data context', ssoServiceBaseURL, clientId, redirectUri, scope);

  function verifyBaseUrlDoesNotEndInSlash() {
    if (
      ssoServiceBaseURL.endsWith('/') ||
      ssoServiceBaseURL.endsWith('/oauth/authorize')
    ) {
      throw new Error(
        'The SSO service base URL must not end in a slash (/), or with /oauth/authorize.',
      );
    }
  }

  verifyBaseUrlDoesNotEndInSlash();

  function verifyBaseUrlDoesNotHaveQueryString() {
    if (ssoServiceBaseURL.includes('?')) {
      throw new Error('The SSO service base URL must not have a query string.');
    }
  }

  verifyBaseUrlDoesNotHaveQueryString();

  const SSO_URL = new URL(ssoServiceBaseURL + '/oauth/authorize');

  const searchParams = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    response_type: 'code',
    state: '123',
  };

  for (const [key, value] of Object.entries(searchParams)) {
    SSO_URL.searchParams.append(key, value);
  }

  return SSO_URL.toString();
}
