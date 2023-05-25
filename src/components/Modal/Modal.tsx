//Modal.tsx
import cn from 'classnames';
import React, { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
  open: boolean;
  disableClickOutside?: boolean;
  onClose(): void;
};

export const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      onClose();
    }
  });

  const modalClass = cn({
    'modal modal-bottom sm:modal-middle': true,
    'modal-open': open,
  });

  return (
    <div className={modalClass}>
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </div>
  );
};
