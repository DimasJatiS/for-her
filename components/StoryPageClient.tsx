'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Section from '@/components/Section';
import TypingText from '@/components/TypingText';
import FloatingParticles from '@/components/FloatingParticles';
import { STORY_SECTIONS } from '@/lib/constants';

export default function StoryPageClient() {
  const router = useRouter();

  return (
    <main className="relative bg-[#2B0F1A] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#2B0F1A_0%,#3A1120_50%,#4A1C2A_100%)]" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4A373]/10 rounded-full blur-3xl" />
      </div>

      <FloatingParticles />

      {STORY_SECTIONS.map((section) => (
        <Section key={section.id} delay={section.delay}>
          <div className="w-full max-w-5xl mx-auto">
            <div className="glass-card card-padding text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-lg mx-auto aspect-square mb-12 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border-2 border-[#D4A373]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 via-transparent to-[#2B0F1A]/20 z-10" />
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F5EBD9] mb-10 drop-shadow-2xl leading-tight tracking-wide"
              >
                {section.title}
              </motion.h2>

              <div className="text-xl md:text-2xl lg:text-3xl text-[#E6C9A8]/85 font-light max-w-3xl mx-auto leading-relaxed">
                <TypingText text={section.text} delay={600} />
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section delay={1.2}>
        <div className="w-full max-w-4xl mx-auto">
          <div className="glass-card card-padding text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mb-14"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F5EBD9] mb-10 leading-tight tracking-wide drop-shadow-2xl">
                How Well Do You Remember Us?
              </h2>
              <p className="text-xl md:text-2xl text-[#E6C9A8]/80 leading-relaxed tracking-wide">
                Let's dig dive and &see if you've been paying attention... 💕
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212,163,115,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/quiz')}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="px-16 py-5 md:px-20 md:py-6 bg-gradient-to-r from-[#D4A373] to-[#E6C9A8] text-[#2B0F1A] rounded-full font-bold text-xl md:text-2xl shadow-[0_0_30px_rgba(212,163,115,0.3)] hover:shadow-[0_0_50px_rgba(212,163,115,0.5)] transition-all duration-300 min-h-[64px] tracking-wide"
            >
              Take the Quiz
            </motion.button>
          </div>
        </div>
      </Section>
    </main>
  );
}
