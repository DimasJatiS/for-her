'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string, index: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizCard({
  question,
  options,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (answer: string, index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      onAnswer(answer, index);
      setSelectedIndex(null);
    }, 500);
  };

  return (
    <div className="w-full">
      {/* Progress bar - Rose gold with refined padding */}
      <div className="progress-padding">
        <div className="flex justify-between items-center text-[#E6C9A8]/80 text-sm font-medium tracking-widest uppercase mb-8 px-1">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shadow-[0_0_8px_rgba(212,163,115,0.6)]"></span>
            Question {questionNumber}
          </span>
          <span className="text-[#E6C9A8]/50">{totalQuestions} total</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="h-full bg-gradient-to-r from-[#D4A373] via-[#E0B88F] to-[#E6C9A8] shadow-[0_0_12px_rgba(212,163,115,0.5)] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"></div>
            </motion.div>
          </div>
          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-8 right-0 text-xs text-[#E6C9A8]/60 font-medium tracking-wider"
          >
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </motion.div>
        </div>
      </div>

      {/* Premium card with refined glassmorphism */}
      <div className="card-padding relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E6C9A8]/5 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-2xl md:text-3xl font-serif text-[#F5EBD9] text-center leading-relaxed mb-16 tracking-wide drop-shadow-md relative z-10">
          {question}
        </h2>

        <div className="space-y-6 relative z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={selectedIndex !== null}
              className={`w-full relative group overflow-hidden rounded-2xl px-8 py-5 text-left border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                selectedIndex === index
                  ? 'bg-[#3A1120]/80 border-[#D4A373] text-[#E6C9A8] shadow-[0_0_30px_rgba(212,163,115,0.3)] scale-[1.02]'
                  : 'bg-[#2B0F1A]/40 border-[#D4A373]/30 text-[#F5EBD9] hover:bg-[#3A1120]/60 hover:border-[#D4A373]/60 hover:shadow-[0_0_20px_rgba(212,163,115,0.15)] hover:scale-[1.015] active:scale-[0.98]'
              }`}
            >
              {/* Elegant shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4A373]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <span className="relative z-10 text-base md:text-lg font-medium tracking-wide leading-relaxed">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
