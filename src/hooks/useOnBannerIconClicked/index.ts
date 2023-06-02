import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRouteName } from '../useRouteName';
import { useRouteUUID } from '../useRouteUUID';

export const useOnBannerIconClicked = () => {
  const { uuid } = useRouteUUID();
  const { routeName } = useRouteName();
  const navigate = useNavigate();

  const onNavigate = useCallback(
    (iconClicked: string) => {
      navigate(`/${routeName}/${uuid}/${iconClicked}`);
    },
    [uuid, routeName],
  );

  return { onNavigate };
};
