'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from '@/components/TypingText';
import Countdown from '@/components/Countdown';
import { FINAL_MESSAGE } from '@/lib/constants';
import dynamic from 'next/dynamic';

// Lazy load particles
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), {
  ssr: false,
});

export default function FinalPage() {
  const [showLetter, setShowLetter] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  // Set your special date here
  const nextSpecialDate = new Date('2026-03-14T00:00:00'); // Example: March 14, 2026

  const handleTypingComplete = () => {
    setTimeout(() => setShowCountdown(true), 1000);
  };

  return (
    <main className="min-h-[100svh] flex items-center justify-center relative overflow-hidden px-6 py-20 text-[#F5EBD9]">
      {/* Warm orange / ember background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.18),transparent_58%),radial-gradient(circle_at_bottom,rgba(212,163,115,0.14),transparent_62%),linear-gradient(135deg,#13050B,#2B0F1A,#1B0710)]" />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 left-1/2 -translate-x-1/2 w-[780px] h-[480px] bg-[#F2994A] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1.06, 1, 1.06] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          className="absolute -bottom-32 -right-32 w-[640px] h-[640px] bg-[#D4A373] rounded-full blur-3xl"
        />
      </div>

      <FloatingParticles rgb="242, 153, 74" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
        {/* Main letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-card card-padding mb-8 md:mb-10"
        >
          <div className="relative z-10 space-y-6 text-left">
            <TypingText
              text={FINAL_MESSAGE}
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed whitespace-pre-line font-light text-[#F5EBD9]"
              onComplete={handleTypingComplete}
            />
          </div>
        </motion.div>

        {/* Photo placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
          <div className="glass-card overflow-hidden">
            <div className="relative aspect-[4/5] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.16),transparent_65%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="text-4xl">🖼️</div>
                <p className="mt-3 text-sm tracking-[0.28em] uppercase text-[#F5EBD9]/60">
                  Photo 1
                </p>
                <p className="mt-2 text-base text-[#F5EBD9]/70">
                  Replace this placeholder with your memory.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="relative aspect-[4/5] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,163,115,0.16),transparent_65%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="text-4xl">🖼️</div>
                <p className="mt-3 text-sm tracking-[0.28em] uppercase text-[#F5EBD9]/60">
                  Photo 2
                </p>
                <p className="mt-2 text-base text-[#F5EBD9]/70">
                  Replace this placeholder with your memory.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <AnimatePresence>
          {showCountdown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 md:mb-12"
            >
              <div className="glass-card card-padding">
                <div className="relative z-10">
                  <Countdown targetDate={nextSpecialDate} label="Until our next adventure" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden letter button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCountdown ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLetter(true)}
            className="h-14 md:h-16 px-10 md:px-12 rounded-full font-semibold text-lg md:text-xl text-[#1B0710] bg-gradient-to-r from-[#F2994A] via-[#D4A373] to-[#F5EBD9] shadow-[0_18px_50px_rgba(242,153,74,0.18)] hover:brightness-[1.03] active:brightness-[0.98] transition"
          >
            Open Secret Letter 💌
          </motion.button>
        </motion.div>
      </div>

      {/* Hidden letter modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLetter(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5EBD9] rounded-3xl p-10 md:p-14 max-w-lg shadow-2xl mx-4"
            >
              <h3 className="text-4xl md:text-5xl font-serif text-[#C46A2B] mb-8 md:mb-10 text-center">
                P.S.
              </h3>
              <p className="text-[#2B0F1A] text-xl md:text-2xl leading-relaxed text-center mb-10">
                Every moment I spend with you is my favorite moment.
                <br /><br />
                Thank you for being you.
                <br /><br />
                I love you more than words can say. 🤍
              </p>
              <button
                onClick={() => setShowLetter(false)}
                className="mt-4 w-full py-5 md:py-6 bg-[#F2994A] text-[#1B0710] text-xl rounded-full hover:bg-[#C46A2B] transition-colors min-h-[64px] font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
