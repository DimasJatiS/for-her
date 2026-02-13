'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: Date;
  label: string;
}

export default function Countdown({ targetDate, label }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center">
      <p className="text-white/80 text-sm mb-4">{label}</p>
      <div className="flex gap-4 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-white/60 text-xs mt-2 capitalize">{unit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
