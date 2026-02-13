'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/constants';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

export default function TypingText({ text, className = '', delay = 0, onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      const typeNextChar = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(typeNextChar, ANIMATION_DURATIONS.typing);
        } else {
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };
      typeNextChar();
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, delay, onComplete]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      )}
    </motion.p>
  );
}
