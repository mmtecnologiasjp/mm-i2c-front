import { Groups } from '../Groups';
import { NavBarCreateIcon } from '../NavBarCreateIcon';
import { NavBarSearch } from '../NavBarSearch';
import { PrivateConversations } from '../PrivateConversations';
import { UserHorizontalCard } from '../UserHorizontalCard';

function NavBar() {
  return (
    <nav className="drawer w-72 bg-gray-900 relative">
      <div className="drawer-content">
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
