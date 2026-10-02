import type { CardFront } from './data/cards';

export interface AskResult {
  answer: 'sim' | 'nao' | 'irrelevante' | 'refaca';
  label: string;
  confidence: number | null;
}

export interface GuessResult {
  score: number;
  maxScore: number;
  solved: boolean;
  level: string | null;
}

export interface RevealData {
  id: number;
  title: string;
  context: string;
  reflection: string;
  antipattern: string;
  backImage: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `Erro ${res.status}`);
  }
  return data as T;
}

export const drawCard = (excludeIds: number[]) =>
  post<CardFront>('/api/draw', { excludeIds });

export const askQuestion = (cardId: number, question: string) =>
  post<AskResult>('/api/ask', { cardId, question });

export const submitGuess = (cardId: number, guess: string) =>
  post<GuessResult>('/api/guess', { cardId, guess });

export const revealCard = (cardId: number) =>
  post<RevealData>('/api/reveal', { cardId });
