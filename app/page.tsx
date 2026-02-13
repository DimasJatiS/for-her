"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Preloader from "@/components/Preloader";

export default function Home() {
  const router = useRouter();
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#2B0F1A] text-[#F5EBD9]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,163,115,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(124,45,76,0.22),transparent_65%),linear-gradient(135deg,#1b0710,#2B0F1A,#3a1022)]" />
      <div className="absolute inset-0 bg-black/35" />

      <AnimatePresence mode="wait">
        {showPreloader ? (
          <Preloader onComplete={() => setShowPreloader(false)} />
        ) : (
          <motion.main
            key="gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-20"
          >
            <div className="glass-card card-padding w-full max-w-xl">
              <div className="relative z-10">
                <p className="text-xs tracking-[0.32em] uppercase text-[#F5EBD9]/55">
                  For Her
                </p>
                <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight tracking-tight">
                  A little journey,
                  <span className="block text-[#D4A373]">made with love.</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-[#F5EBD9]/75 leading-relaxed">
                  Take a deep breath. Tap start. I’ll guide you through a few
                  pages—stories, a tiny quiz, and a small promise at the end.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => router.push("/story")}
                    className="h-12 px-6 rounded-full bg-[#D4A373] text-[#2B0F1A] font-semibold shadow-[0_12px_30px_rgba(212,163,115,0.28)] hover:brightness-[1.05] active:brightness-[0.98] transition"
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/quiz")}
                    className="h-12 px-6 rounded-full border border-white/15 bg-white/[0.05] text-[#F5EBD9] hover:bg-white/[0.08] transition"
                  >
                    Skip to Quiz
                  </button>
                </div>

                <p className="mt-8 text-xs text-[#F5EBD9]/55">
                  Best experienced with sound on.
                </p>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
