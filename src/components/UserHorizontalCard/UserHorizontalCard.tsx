import { useUser } from '../../store/useUser';
import { HStack } from '../HStack';

export function UserHorizontalCard() {
  const { user } = useUser();

  return (
    <HStack className="items-center space-x-4 pt-12 ml-3.5">
      <div className="avatar online w-16">
        <img
          src={
            user?.avatar_url ??
            'https://www.shareicon.net/data/2016/05/24/770137_man_512x512.png'
          }
          alt=""
          className="rounded-full"
        />
      </div>
      <p className="font-larsseit space-x-1 text-white">
        <span>{user?.first_name}</span>
        <span>{user?.last_name}</span>
      </p>
    </HStack>
  );
}
