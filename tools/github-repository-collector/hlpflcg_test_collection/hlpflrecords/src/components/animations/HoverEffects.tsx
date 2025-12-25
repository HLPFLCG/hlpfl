'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Enhanced button with hover and tap effects
interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const AnimatedButton = ({ children, variant = 'primary', className = '', ...props }: AnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Enhanced card with hover lift effect
interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  hoverScale?: number;
}

export const AnimatedCard = ({ children, hoverScale = 1.02, className = '', ...props }: AnimatedCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated link with underline effect
export const AnimatedLink = ({ children, className = '', ...props }: Omit<HTMLMotionProps<'a'>, 'children'> & { children: ReactNode }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

// Floating animation (for icons, badges, etc.)
export const FloatingElement = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation (for notifications, alerts)
export const PulseElement = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Shake animation (for errors, attention)
export const ShakeElement = ({ children, className = '', trigger = false }: { children: ReactNode; className?: string; trigger?: boolean }) => {
  return (
    <motion.div
      animate={trigger ? {
        x: [0, -10, 10, -10, 10, 0],
      } : {}}
      transition={{
        duration: 0.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Bounce animation (for success, celebration)
export const BounceElement = ({ children, className = '', trigger = false }: { children: ReactNode; className?: string; trigger?: boolean }) => {
  return (
    <motion.div
      animate={trigger ? {
        y: [0, -20, 0, -10, 0],
      } : {}}
      transition={{
        duration: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Rotate animation (for loading, processing)
export const RotateElement = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};