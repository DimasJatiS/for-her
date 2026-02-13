'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Section({ children, className = '', delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={`min-h-[100svh] flex items-center justify-center px-6 py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
