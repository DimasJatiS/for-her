// Constants untuk emotional journey
export const MUSIC_CONFIG = {
  volume: 0.3,
  fadeInDuration: 2000,
  loop: true,
};

export const ANIMATION_DURATIONS = {
  pageFade: 0.6,
  textReveal: 0.8,
  stagger: 0.1,
  typing: 50, // ms per character
  particleLife: 3000,
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Where was our first date?",
    options: ["Coffee shop", "Restaurant", "Park", "Cinema"],
    correctAnswer: 0, // Index of correct answer
  },
  {
    id: 2,
    question: "Who said 'I love you' first?",
    options: ["You did", "I did", "We said it together", "Can't remember"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is our song?",
    options: ["Perfect by Ed Sheeran", "A Thousand Years", "All of Me", "Thinking Out Loud"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What do you love most about us?",
    options: ["How we laugh together", "How we understand each other", "Our adventures", "Everything"],
    correctAnswer: 3,
  },
];

export const STORY_SECTIONS = [
  {
    id: 1,
    title: "The Beginning",
    text: "Do you remember this day?",
    image: "/images/memory-1.png",
    delay: 0,
  },
  {
    id: 2,
    title: "First Laugh",
    text: "When you smiled... my world changed forever.",
    image: "/images/memory-2.png",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Growing Together",
    text: "Every moment with you is a treasure I never want to lose.",
    image: "/images/memory-3.png",
    delay: 0.6,
  },
  {
    id: 4,
    title: "Forever Starts Here",
    text: "I never knew that someone could change my world...",
    image: "/images/memory-4.png",
    delay: 0.9,
  },
];

export const FINAL_MESSAGE = `
My Dearest Love,

Every day with you feels like a dream I never want to wake up from.
You've taught me what it means to truly love and be loved.

Thank you for being my light, my home, my everything.

This is just the beginning of our forever.

With all my heart,
Always yours 🤍
`;

export const COLORS = {
  primary: {
    rose: '#FFE4E1',
    deepRose: '#FF6B9D',
    cream: '#FFF8DC',
  },
  gradients: {
    main: 'from-rose-500 via-pink-400 to-orange-200',
    dark: 'from-rose-900 via-pink-900 to-purple-900',
    soft: 'from-pink-100 via-rose-50 to-orange-50',
  },
};
