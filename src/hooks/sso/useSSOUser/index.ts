import { useQuery } from '@tanstack/react-query';

import { useSSOContext } from '../../../contexts/sso-provider';
import { TokenResponse } from '../types';
import { useSSOApi } from '../useSSOApi';
import { User } from './types';

export function useSSOUser() {
  const { ssoApi } = useSSOApi();
  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUserInfo();
      return data;
    },
  });
  const { tokenDataKey } = useSSOContext();
  const sessionStorageTokenData = sessionStorage.getItem(tokenDataKey);

  async function getUserInfo() {
    if (!sessionStorageTokenData) return null;

    const data = await ssoApi.getUserInfo();

    return data;
  }

  return {
    getUserInfo,
    sessionStorageTokenData,
    decodedToken: sessionStorageTokenData
      ? (JSON.parse(sessionStorageTokenData) as TokenResponse)
      : null,
    user,
  };
}
