import { useEffect } from 'react';

import { useUserQuery } from '../../hooks/useUserQuery';
import { useUser } from '../../store/useUser';
import { Groups } from '../Groups';
import { NavBarCreateIcon } from '../NavBarCreateIcon';
import { NavBarSearch } from '../NavBarSearch';
import { PrivateConversations } from '../PrivateConversations';
import { UserHorizontalCard } from '../UserHorizontalCard';

function NavBar() {
  const { user } = useUserQuery();

  const {
    actions: { storeUser },
  } = useUser();

  useEffect(() => {
    if (!user) return;

    storeUser(user);
  }, [user]);

  return (
    <nav className="h-screen w-1/6 bg-gray-900 relative">
      <div>
        <UserHorizontalCard />
        <NavBarSearch />
        <Groups />
        <PrivateConversations />
      </div>
      <NavBarCreateIcon />
    </nav>
  );
}

export default NavBar;
