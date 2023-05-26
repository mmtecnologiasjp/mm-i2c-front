import { useLocation, useNavigate } from 'react-router-dom';

import { useUserGroupsQuery } from '../../hooks/useUserGroupsQuery';
import { NavBarList } from '../NavBarList';

export function Groups() {
  const { groups } = useUserGroupsQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const uuid = location.pathname.split('/')[2];

  const handleNavigate = (uuid: string) => {
    navigate(`/group/${uuid}`);
  };

  return (
    <div>
      <NavBarList listName="Groups">
        {groups?.length ? (
          <>
            {groups.map((group) => (
              <NavBarList.Item
                key={group.uuid}
                imageUrl={group.image_url}
                isActive={group.uuid === uuid}
                name={group.name}
                uuid={group.uuid}
                onItemClicked={handleNavigate}
              />
            ))}
          </>
        ) : (
          <NavBarList.ListEmpty label="You don't have any groups yet" />
        )}
      </NavBarList>
    </div>
  );
}
