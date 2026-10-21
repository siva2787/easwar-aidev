import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useMedia';

interface Props { children: ReactNode; delay?: number; y?: number; className?: string }

/** Content reveal primitive: opacity + translate, once, skipped under reduced motion. */
export const Reveal: React.FC<Props> = ({ children, delay = 0, y = 24, className }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
