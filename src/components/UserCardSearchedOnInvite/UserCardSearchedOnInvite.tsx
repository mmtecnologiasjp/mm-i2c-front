import { User } from '../../hooks/useUserQuery/types';
import { HStack } from '../HStack';

export function UserCardSearchedOnInvite({
  onClick,
  user,
}: {
  onClick: (user: User) => void;
  user: User;
}) {
  return (
    <HStack
      className="border mb-2 border-gray-600 items-center rounded-md  space-x-2 p-2.5 hover:bg-gray-700 cursor-pointer"
      key={user.uuid}
      onClick={() => onClick(user)}
    >
      <img
        className="w-8 rounded-full"
        src={
          user.avatar_url ??
          'https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg'
        }
        alt={`${user.first_name} avatar`}
      />
      <p className="font-larsseit mb-0.5 w-[50%] truncate">
        <span className="mr-1">{user.first_name}</span>
        {user.last_name}
      </p>
      <div className="sm:flex w-[50%]">
        <div className="tooltip w-full" data-tip={user.email}>
          <div className="flex w-44">
            <p className="truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </HStack>
  );
}
