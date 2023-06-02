import { useLocation } from 'react-router-dom';

export const useRouteName = () => {
  const location = useLocation();
  const routeName = location.pathname.split('/')[1];

  return { routeName };
};
