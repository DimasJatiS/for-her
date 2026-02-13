'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load confetti for performance
const ConfettiCanvas = dynamic(() => import('@/components/ConfettiCanvas'), {
  ssr: false,
});

export default function ForeverPage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [clickedYes, setClickedYes] = useState(false);
  const router = useRouter();

  const handleNoHover = () => {
    // Move "No" button to random position
    const maxX = Math.max(0, window.innerWidth - 240);
    const maxY = Math.max(0, window.innerHeight - 240);
    setNoButtonPosition({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  };

  const handleYes = () => {
    setClickedYes(true);
    setTimeout(() => {
      router.push('/final');
    }, 2000);
  };

  return (
    <main className="min-h-[100svh] flex items-center justify-center relative overflow-hidden px-6 py-20">
      {/* Deep romantic orange / ember background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.18),transparent_58%),radial-gradient(circle_at_bottom,rgba(212,163,115,0.14),transparent_62%),linear-gradient(135deg,#13050B,#2B0F1A,#1B0710)]" />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 left-1/2 -translate-x-1/2 w-[760px] h-[460px] bg-[#F2994A] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1.06, 1, 1.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -bottom-32 -right-32 w-[640px] h-[640px] bg-[#D4A373] rounded-full blur-3xl"
        />
      </div>

      {/* Confetti */}
      <ConfettiCanvas
        trigger={clickedYes}
        palette={['#F5EBD9', '#E6C9A8', '#D4A373', '#F2994A', '#C46A2B']}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: clickedYes ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.8 }}
          className={`glass-card card-padding text-center transition-all duration-500 ${clickedYes ? 'scale-[1.03]' : ''}`}
        >
          <p className="text-xs tracking-[0.32em] uppercase text-[#F5EBD9]/55">
            One last question
          </p>
          <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-serif text-[#F5EBD9] mb-10 md:mb-12 leading-tight max-w-3xl mx-auto">
            Will you stay with me…
            <span className="block bg-gradient-to-r from-[#F2994A] via-[#D4A373] to-[#F5EBD9] bg-clip-text text-transparent">
              always?
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#F5EBD9]/70 max-w-2xl mx-auto leading-relaxed mb-12 md:mb-14">
            No pressure. Just a small promise—soft, steady, and endlessly us.
          </p>

          {!clickedYes ? (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Yes button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 px-10 rounded-full font-semibold text-lg md:text-xl text-[#1B0710] bg-gradient-to-r from-[#F2994A] via-[#D4A373] to-[#F5EBD9] shadow-[0_18px_50px_rgba(242,153,74,0.18)] hover:brightness-[1.03] active:brightness-[0.98] transition"
              >
                Yes, always
              </motion.button>

              {/* No button - runs away */}
              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 px-10 rounded-full font-semibold text-lg md:text-xl text-[#F5EBD9] bg-white/[0.06] border border-white/12 hover:bg-white/[0.08] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition"
              >
                Not yet
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 mt-6"
            >
              <div className="text-7xl md:text-8xl">🧡✨</div>
              <p className="text-2xl md:text-3xl text-[#F5EBD9] font-light leading-relaxed">
                I’ll keep choosing you.
              </p>
              <p className="text-base md:text-lg text-[#F5EBD9]/70">
                One step closer to forever…
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Ambient glow effect */}
        {clickedYes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[#F2994A]/25 blur-3xl"
          />
        )}
      </div>
    </main>
  );
}
