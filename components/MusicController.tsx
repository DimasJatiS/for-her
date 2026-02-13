'use client';

import { useMusic } from '@/lib/MusicContext';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicController() {
  const { isMuted, toggleMute, isPlaying } = useMusic();

  if (!isPlaying) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={toggleMute}
      className="fixed top-6 right-6 z-40 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white" />
      ) : (
        <Volume2 className="w-5 h-5 text-white" />
      )}
    </motion.button>
  );
}
