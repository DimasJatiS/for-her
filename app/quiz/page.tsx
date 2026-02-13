'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import QuizCard from '@/components/QuizCard';
import { QUIZ_QUESTIONS } from '@/lib/constants';
import { saveQuizResponse } from '@/lib/supabase';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  const handleAnswer = async (answer: string) => {
    const question = QUIZ_QUESTIONS[currentQuestion];

    await saveQuizResponse(question.id, question.question, answer);

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push('/forever');
      }
    }, 1000);
  };

  return (
    <main className="min-h-[100svh] flex items-center justify-center relative overflow-hidden px-6 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B0F1A] via-[#3A1120] to-[#1C0A12]" />
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#D4A373]/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#E6C9A8]/6 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {!showFeedback && (
          <QuizCard
            question={QUIZ_QUESTIONS[currentQuestion].question}
            options={QUIZ_QUESTIONS[currentQuestion].options}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        )}

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="text-8xl"
            >
              
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
