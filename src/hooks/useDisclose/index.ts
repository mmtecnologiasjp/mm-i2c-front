import { useState } from 'react';

export function useDisclose(initState?: boolean) {
  const [isOpen, setIsOpen] = useState(initState ?? false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return [isOpen, onToggle, onClose, onOpen] as const;
}
