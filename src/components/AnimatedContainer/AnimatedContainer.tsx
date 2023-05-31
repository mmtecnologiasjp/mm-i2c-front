import { motion as Motion } from 'framer-motion';
import { ReactNode } from 'react';

const animations = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export function AnimatedContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={{
        duration: 0.3,
        ease: 'easeIn',
      }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}
