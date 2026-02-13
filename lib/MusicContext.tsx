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
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = MUSIC_CONFIG.loop;
    audioRef.current.volume = 0;
    audioRef.current.preload = 'auto';
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsReady(true);
    });

    audioRef.current.addEventListener('error', () => {
      // Helpful signal when the mp3 is missing in production
      setIsReady(false);
    });

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    // Cancel any previous fades
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    // Keep mute state consistent
    audioRef.current.muted = isMuted;

    // Attempt to play immediately (must be called from a user gesture on iOS)
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);

        // Fade in volume
        fadeIntervalRef.current = window.setInterval(() => {
          if (!audioRef.current) return;

          if (audioRef.current.volume < volume) {
            const newVolume = Math.min(audioRef.current.volume + 0.02, volume);
            audioRef.current.volume = newVolume;
          } else if (fadeIntervalRef.current) {
            window.clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, MUSIC_CONFIG.fadeInDuration / 50);
      })
      .catch((e) => {
        // Most common reasons: missing mp3 (404) or autoplay restriction
        console.error('Audio play failed:', e);
        setIsPlaying(false);
      });
  }, [isMuted, volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
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
