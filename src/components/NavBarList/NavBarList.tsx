import { useState } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';

import { HStack } from '../HStack';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const styles = {
  className: 'text-3xl font-larsseit cursor-pointer',
};

function Main({ listName, children }: { listName: string; children: React.ReactNode }) {
  const [isListVisible, setIsListVisible] = useState(true);

  const onToggle = () => {
    setIsListVisible(!isListVisible);
  };

  const icons = {
    down: <HiChevronDown {...styles} onClick={onToggle} />,
    right: <HiChevronRight {...styles} onClick={onToggle} />,
  };

  return (
    <>
      <HStack className="items-center space-x-1 ml-2 mt-12">
        {icons[isListVisible ? 'down' : 'right']}
        <p className="text-white font-larsseit mt-0.5 select-none">
          {capitalize(listName)}
        </p>
      </HStack>
      {isListVisible && <ul className="menu">{children}</ul>}
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
          <img src={imageUrl} alt={`${name} avatar`} className="rounded-full w-8" />
        )}
        <p className="font-larsseit mt-0.5 text-white">{name}</p>
      </HStack>
    </li>
  );
}

export const NavBarList = Object.assign(Main, { Item });
