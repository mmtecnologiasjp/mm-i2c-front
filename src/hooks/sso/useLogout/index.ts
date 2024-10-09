import { useNavigate } from 'react-router-dom';

import { useSSOContext } from '../../../contexts/sso-provider';
import { useUserLoginState } from '../../../store/useUserLoginState';

export function useLogout() {
  const { logout } = useUserLoginState();
  const navigate = useNavigate();
  const { tokenDataKey } = useSSOContext();

  function handleLogout() {
    sessionStorage.removeItem(tokenDataKey);
    logout();
    navigate('/');
  }

  return {
    handleLogout,
  };
}
