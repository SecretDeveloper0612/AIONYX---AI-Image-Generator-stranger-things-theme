import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  animate?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = '', 
  id,
  fullWidth = false,
  animate = true
}) => {
  const containerClasses = fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6';

  return (
    <section id={id} className={`relative py-20 md:py-28 overflow-hidden ${className}`}>
      {animate ? (
        <motion.div
          className={containerClasses}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom easing for smooth feel
        >
          {children}
        </motion.div>
      ) : (
        <div className={containerClasses}>
          {children}
        </div>
      )}
    </section>
  );
};