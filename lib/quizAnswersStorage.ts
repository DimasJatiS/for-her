export const QUIZ_ANSWERS_STORAGE_KEY = 'for-her:quizAnswers:v2';
const LEGACY_KEY = 'for-her:quizAnswers:v1';

export type StoredQuizAnswer = {
  questionId: number;
  question: string;
  answer: string;
  at: string;
};

function normalizeAnswers(input: unknown): StoredQuizAnswer[] {
  if (!Array.isArray(input)) return [];

  const valid = input
    .filter(
      (item): item is StoredQuizAnswer =>
        !!item &&
        typeof (item as StoredQuizAnswer).questionId === 'number' &&
        typeof (item as StoredQuizAnswer).question === 'string' &&
        typeof (item as StoredQuizAnswer).answer === 'string' &&
        typeof (item as StoredQuizAnswer).at === 'string'
    )
    .map((item) => ({
      questionId: item.questionId,
      question: item.question,
      answer: item.answer,
      at: item.at,
    }));

  // Dedupe by questionId, keep the newest (by `at` string compare).
  const byId = new Map<number, StoredQuizAnswer>();
  for (const item of valid) {
    const existing = byId.get(item.questionId);
    if (!existing) {
      byId.set(item.questionId, item);
      continue;
    }
    byId.set(item.questionId, existing.at <= item.at ? item : existing);
  }

  return [...byId.values()].sort((a, b) => a.questionId - b.questionId);
}

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function getQuizAnswers(): StoredQuizAnswer[] {
  if (typeof window === 'undefined') return [];

  const rawV2 = readRaw(QUIZ_ANSWERS_STORAGE_KEY);
  if (rawV2 == null || rawV2 === '') {
    // Try a safe one-time migration from legacy key.
    const legacyRaw = readRaw(LEGACY_KEY);
    if (!legacyRaw) return [];

    try {
      const parsedLegacy = JSON.parse(legacyRaw) as unknown;
      const normalizedLegacy = normalizeAnswers(parsedLegacy);
      if (normalizedLegacy.length > 0) {
        writeRaw(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(normalizedLegacy));
      }
      return normalizedLegacy;
    } catch {
      // Legacy is corrupted; remove it so future saves aren't blocked by repeated parse.
      removeKey(LEGACY_KEY);
      return [];
    }
  }

  try {
    const parsed = JSON.parse(rawV2) as unknown;
    const normalized = normalizeAnswers(parsed);

    // If v2 content isn't valid array, reset.
    if (normalized.length === 0 && rawV2 !== '[]') {
      // If it's truly empty or invalid, clear it to allow clean writes.
      // (We keep real empty list '[]' as-is.)
      const isLikelyInvalid = rawV2.trim() !== '[]';
      if (isLikelyInvalid) removeKey(QUIZ_ANSWERS_STORAGE_KEY);
    }

    return normalized;
  } catch {
    removeKey(QUIZ_ANSWERS_STORAGE_KEY);
    return [];
  }
}

export function saveQuizAnswer(next: Omit<StoredQuizAnswer, 'at'> & { at?: string }): void {
  if (typeof window === 'undefined') return;

  const current = getQuizAnswers();
  const at = next.at ?? new Date().toISOString();

  const filtered = current.filter((item) => item.questionId !== next.questionId);
  const merged: StoredQuizAnswer[] = [...filtered, { ...next, at }].sort(
    (a, b) => a.questionId - b.questionId
  );

  writeRaw(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(merged));
}

export function clearQuizAnswers(): void {
  if (typeof window === 'undefined') return;
  removeKey(QUIZ_ANSWERS_STORAGE_KEY);
  removeKey(LEGACY_KEY);
}
