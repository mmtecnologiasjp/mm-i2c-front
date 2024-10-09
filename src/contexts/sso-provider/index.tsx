import { createContext, useContext, useMemo } from 'react';

import { SSOContextData, SSOProviderProps } from './types';

const SSOContext = createContext({} as SSOContextData);
export const useSSOContext = () => {
  const context = useContext(SSOContext);

  if (!context) {
    throw new Error('useSSOContext must be used within a SSOProvider');
  }

  return context;
};

export function SSOProvider({
  children,
  clientId,
  clientSecret,
  grant_type,
  redirectUri,
  ssoServiceBaseURL,
  scope,
  tokenDataKey,
}: SSOProviderProps) {
  const memoizedValues = useMemo(
    () => ({
      clientId,
      clientSecret,
      grant_type,
      redirectUri,
      ssoServiceBaseURL,
      scope,
      tokenDataKey,
    }),
    [],
  );

  return <SSOContext.Provider value={memoizedValues}>{children}</SSOContext.Provider>;
}
