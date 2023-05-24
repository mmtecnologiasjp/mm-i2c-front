import { HiChevronDown } from 'react-icons/hi';

import { HStack } from '../HStack';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function Main({ listName, children }: { listName: string; children: React.ReactNode }) {
  return (
    <>
      <HStack className="items-center space-x-1 ml-2 mt-12">
        <HiChevronDown className="text-3xl font-larsseit" />
        <p className="text-white font-larsseit mt-0.5 select-none">
          {capitalize(listName)}
        </p>
      </HStack>
      <ul className="menu">{children}</ul>
    </>
  );
}

function Item({
  isActive,
  imageUrl,
  name,
  onItemClicked,
  uuid,
}: {
  isActive: boolean;
  imageUrl: string | null;
  name: string;
  onItemClicked: (uuid: string) => void;
  uuid: string;
}) {
  return (
    <li className={`${isActive && 'bordered'}`}>
      <HStack className="items-center space-x-3" onClick={() => onItemClicked(uuid)}>
        {imageUrl && (
          <img src={imageUrl} alt={`${name} avatar`} className="rounded-full w-12 h-12" />
        )}
        <p className="font-larsseit mt-0.5 text-white">{name}</p>
      </HStack>
    </li>
  );
}

export const NavBarList = Object.assign(Main, { Item });
