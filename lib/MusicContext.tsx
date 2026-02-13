'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { MUSIC_CONFIG } from '@/lib/constants';

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  isReady: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(MUSIC_CONFIG.volume);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = MUSIC_CONFIG.loop;
    audioRef.current.volume = 0;
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsReady(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current && isReady) {
      // Fade in volume
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < volume) {
          const newVolume = Math.min(audioRef.current.volume + 0.02, volume);
          audioRef.current.volume = newVolume;
        } else {
          clearInterval(fadeIn);
        }
      }, MUSIC_CONFIG.fadeInDuration / 50);

      audioRef.current.play().catch((e) => console.error('Audio play failed:', e));
      setIsPlaying(true);
    }
  }, [isReady, volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        play,
        pause,
        toggleMute,
        setVolume,
        isReady,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
