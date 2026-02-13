'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { MUSIC_CONFIG } from '@/lib/constants';

const MUSIC_STORAGE_KEY = 'for-her:music:v1';

type StoredMusicState = {
  t: number;
  playing: boolean;
  muted: boolean;
  volume: number;
};

function readStoredMusicState(): StoredMusicState | null {
  try {
    const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredMusicState>;
    if (typeof parsed.t !== 'number') return null;
    return {
      t: Number.isFinite(parsed.t) ? parsed.t : 0,
      playing: Boolean(parsed.playing),
      muted: Boolean(parsed.muted),
      volume:
        typeof parsed.volume === 'number' && Number.isFinite(parsed.volume)
          ? Math.min(Math.max(parsed.volume, 0), 1)
          : MUSIC_CONFIG.volume,
    };
  } catch {
    return null;
  }
}

function writeStoredMusicState(next: StoredMusicState) {
  try {
    localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

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
  const lastSavedAtRef = useRef<number>(0);
  const storedStateRef = useRef<StoredMusicState | null>(null);

  useEffect(() => {
    storedStateRef.current = readStoredMusicState();

    // Initialize audio element
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = MUSIC_CONFIG.loop;
    audioRef.current.volume = 0;
    audioRef.current.preload = 'auto';

    // Restore persisted settings ASAP
    const stored = storedStateRef.current;
    if (stored) {
      setIsMuted(stored.muted);
      setVolumeState(stored.volume);
      audioRef.current.muted = stored.muted;
    }

    const handleLoadedMetadata = () => {
      const s = storedStateRef.current;
      if (!audioRef.current) return;
      if (s && Number.isFinite(s.t) && s.t > 0) {
        try {
          // Seek to last position
          audioRef.current.currentTime = Math.max(0, s.t);
        } catch {
          // ignore
        }
      }
    };
    
    const handleCanPlay = () => setIsReady(true);

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const now = Date.now();
      // Throttle writes to avoid spamming storage
      if (now - lastSavedAtRef.current < 2000) return;
      lastSavedAtRef.current = now;

      const payload: StoredMusicState = {
        t: audioRef.current.currentTime || 0,
        playing: !audioRef.current.paused,
        muted: audioRef.current.muted,
        volume,
      };
      writeStoredMusicState(payload);
      storedStateRef.current = payload;
    };

    const handlePageHide = () => {
      if (!audioRef.current) return;
      const payload: StoredMusicState = {
        t: audioRef.current.currentTime || 0,
        playing: !audioRef.current.paused,
        muted: audioRef.current.muted,
        volume,
      };
      writeStoredMusicState(payload);
      storedStateRef.current = payload;
    };

    const handleError = () => {
      // Helpful signal when the mp3 is missing in production
      setIsReady(false);
    };

    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('canplaythrough', handleCanPlay);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);
    audioRef.current.addEventListener('error', handleError);

    // Try to resume automatically if browser allows it.
    // If blocked (most mobile), user can tap the music button and it will resume from stored time.
    if (stored?.playing) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    // Cancel any previous fades
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    // Keep mute state consistent
    audioRef.current.muted = isMuted;

    // Ensure we restore last position if available
    const stored = storedStateRef.current;
    if (stored && Number.isFinite(stored.t) && stored.t > 0) {
      try {
        // Only seek if we're basically at start
        if (audioRef.current.currentTime < 0.5) {
          audioRef.current.currentTime = Math.max(0, stored.t);
        }
      } catch {
        // ignore
      }
    }

    // Attempt to play immediately (must be called from a user gesture on iOS)
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);

        // Persist playing state
        if (audioRef.current) {
          const payload: StoredMusicState = {
            t: audioRef.current.currentTime || 0,
            playing: true,
            muted: audioRef.current.muted,
            volume,
          };
          writeStoredMusicState(payload);
          storedStateRef.current = payload;
        }

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

      const payload: StoredMusicState = {
        t: audioRef.current.currentTime || 0,
        playing: false,
        muted: audioRef.current.muted,
        volume,
      };
      writeStoredMusicState(payload);
      storedStateRef.current = payload;
    }
  }, [volume]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      const payload: StoredMusicState = {
        t: audioRef.current.currentTime || 0,
        playing: !audioRef.current.paused,
        muted: !isMuted,
        volume,
      };
      writeStoredMusicState(payload);
      storedStateRef.current = payload;
    }
  }, [isMuted, volume]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);

      const payload: StoredMusicState = {
        t: audioRef.current.currentTime || 0,
        playing: !audioRef.current.paused,
        muted: audioRef.current.muted,
        volume: newVolume,
      };
      writeStoredMusicState(payload);
      storedStateRef.current = payload;
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
