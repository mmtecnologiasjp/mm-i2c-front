import { useNavigate, useParams } from 'react-router-dom';

import { useUserGroupsQuery } from '../../hooks/useUserGroupsQuery';
import { GroupCard } from '../GroupCard';
import { NavBarList } from '../NavBarList';

export function Groups() {
  const { groups } = useUserGroupsQuery();
  const { uuid } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (uuid: string) => {
    navigate(`/group/${uuid}`);
  };

  return (
    <div>
      <NavBarList listName="Groups">
        {groups?.map((group) => (
          <NavBarList.Item
            key={group.uuid}
            imageUrl={group.image_url}
            isActive={group.uuid === uuid}
            name={group.name}
            uuid={group.uuid}
            onItemClicked={handleNavigate}
          />
        ))}
      </NavBarList>
    </div>
  );
}
