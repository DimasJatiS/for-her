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
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const videoSrc = '/video/our-video.mp4';

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

        {/* Video */}
        <div className="mb-10 md:mb-12">
          <div className="glass-card card-padding">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
              <div>
                <p className="text-xs tracking-[0.32em] uppercase text-[#F5EBD9]/55">
                  A short clip
                </p>
                <h2 className="mt-3 font-serif text-2xl md:text-3xl leading-tight">
                  One more memory,
                  <span className="block text-[#D4A373]">in motion.</span>
                </h2>
                <p className="mt-4 text-base text-[#F5EBD9]/70 leading-relaxed max-w-xl">
                  Tap play to watch our little video. It’s saved inside the site at
                  <span className="text-[#F5EBD9]/80"> {videoSrc}</span>.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setVideoError(false);
                  setShowVideo(true);
                }}
                className="h-12 md:h-14 px-6 md:px-8 rounded-full font-semibold text-base md:text-lg text-[#1B0710] bg-gradient-to-r from-[#F2994A] via-[#D4A373] to-[#F5EBD9] shadow-[0_16px_45px_rgba(242,153,74,0.16)] hover:brightness-[1.03] active:brightness-[0.98] transition whitespace-nowrap"
              >
                Play Video ▶
              </motion.button>
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

      {/* Video modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-3xl overflow-hidden"
            >
              <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.32em] uppercase text-[#F5EBD9]/55">Video</p>
                  <p className="mt-1 text-sm text-[#F5EBD9]/70">{videoSrc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVideo(false)}
                  className="h-10 px-4 rounded-full border border-white/15 bg-white/[0.05] text-[#F5EBD9] hover:bg-white/[0.08] transition"
                >
                  Close
                </button>
              </div>

              <div className="p-5 md:p-6">
                {videoError ? (
                  <div className="text-center py-10">
                    <p className="text-lg font-semibold">Video not found</p>
                    <p className="mt-2 text-[#F5EBD9]/70">
                      Put your file at <span className="text-[#F5EBD9]/85">public/video/our-video.mp4</span>,
                      commit, then redeploy.
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <video
                      key={videoSrc}
                      src={videoSrc}
                      controls
                      playsInline
                      preload="metadata"
                      autoPlay
                      onError={() => setVideoError(true)}
                      className="block w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
