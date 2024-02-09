import { useNavigate } from 'react-router-dom';

import { HStack } from '../HStack';

export function GroupCard({
  name,
  imageUrl,
  isActive,
  uuid,
}: {
  name: string;
  imageUrl: string;
  isActive: boolean;
  uuid: string;
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/group/${uuid}`);
  };

  return (
    <li className={`${isActive && 'bordered'}`}>
      <HStack className="items-center space-x-3" onClick={handleNavigation}>
        <img src={imageUrl} alt="" className="rounded-full w-12 h-12" />
        <p className="font-larsseit mt-0.5 text-white">{name}</p>
      </HStack>
    </li>
  );
}
