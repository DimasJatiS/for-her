'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* British Racing Green layered background */}
      <div className="absolute inset-0 bg-[#0B1F1A]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,167,94,0.12),transparent_60%),linear-gradient(135deg,#0B1F1A,#132E27,#1E3F35)]" />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Soft ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[#C6A75E] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -bottom-28 -right-28 w-[620px] h-[620px] bg-[#F5EBD9] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 w-full max-w-lg"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-serif text-[#F5EBD9] mb-10 tracking-wide drop-shadow-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          I made something for you...
        </motion.h1>

        <div className="w-full max-w-sm mx-auto">
          <div className="flex justify-between text-xs tracking-widest uppercase text-[#F5EBD9]/60 mb-4">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.45)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C6A75E] via-[#E6D4B0] to-[#F5EBD9] rounded-full shadow-[0_0_14px_rgba(198,167,94,0.45)] relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
