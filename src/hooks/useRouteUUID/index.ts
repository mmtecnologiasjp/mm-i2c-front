import { useLocation } from 'react-router-dom';

export const useRouteUUID = () => {
  const location = useLocation();
  const uuid = location.pathname.split('/')[2];

  return { uuid };
};
