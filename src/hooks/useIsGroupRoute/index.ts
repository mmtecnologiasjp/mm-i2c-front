import { useLocation } from 'react-router-dom';

export const useIsGroupRoute = () => {
  const route = useLocation();
  const isGroupRoute = route.pathname.includes('group');

  return {
    isGroupRoute,
  };
};
