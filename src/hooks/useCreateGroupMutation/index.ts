import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';
import { Group } from '../useUserGroupsQuery/types';
import { CreateGroup } from './types';

const createGroup = async (data: CreateGroup) => {
  const res = await api.post('/groups', data);

  return res.data;
};

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: createGroup,
    mutationKey: ['create_group_mutation'],
    onSuccess: (newData: Group) => {
      const groupKey = 'groups';

      queryClient.setQueryData<Group[]>([groupKey], (oldData) => {
        if (!oldData) return [];

        navigate(`/group/${newData.uuid}/chat`);
        return [...oldData, newData];
      });
    },
  });

  return { mutateAsync };
};
