import { Groups } from '../Groups';
import { PrivateConversations } from '../PrivateConversations';
import { UserHorizontalCard } from '../UserHorizontalCard';

export function NavBar() {
  return (
    <nav className="drawer w-72 bg-gray-900">
      <div className="drawer-content">
        <UserHorizontalCard />
        <Groups />
        <PrivateConversations />
      </div>
    </nav>
  );
}
