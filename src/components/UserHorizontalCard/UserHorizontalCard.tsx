import { useUserQuery } from '../../hooks/useUserQuery';
import { HStack } from '../HStack';

export function UserHorizontalCard() {
  const { user } = useUserQuery();

  return (
    <HStack className="items-center space-x-4 pt-12 ml-3.5">
      <img
        src="https://www.shareicon.net/data/2016/05/24/770137_man_512x512.png"
        alt=""
        className="w-20"
      />
      <p className="font-larsseit space-x-1 text-white">
        <span>{user?.first_name}</span>
        <span>{user?.last_name}</span>
      </p>
    </HStack>
  );
}
