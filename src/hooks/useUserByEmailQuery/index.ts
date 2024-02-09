import { useState } from 'react';
import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { User } from '../useUserQuery/types';

const fetchUserByEmail = async (email: string) => {
  const response = await api.get<User[]>(`/users/search/email?searchParameter=${email}`);

  return response.data;
};

export const useUserByEmailQuery = (email: string) => {
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [keepPreviousData, setKeepPreviousData] = useState(true);

  const { data, refetch, isLoading } = useQuery({
    queryFn: () => fetchUserByEmail(email),
    queryKey: ['user_by_email', email],
    enabled: isQueryEnabled,
    keepPreviousData,
  });

  const enableQuery = () => setIsQueryEnabled(true);
  const disableQuery = () => setIsQueryEnabled(false);
  const enablePrevioudata = () => setKeepPreviousData(true);
  const disablePreviousData = () => setKeepPreviousData(false);

  return {
    users: data,
    refetch,
    enableQuery,
    disableQuery,
    enablePrevioudata,
    disablePreviousData,
    isLoading,
  };
};
