const TYPESAFE_URL = 'https://api.typesafe.ai/v1/systemone';

export interface TypeSafeQuestion {
  type: 'noul' | 'choice' | 'score';
  instructions: string | object | unknown[];
  criteria?: unknown;
}

export interface TypeSafeAnswer {
  type: string;
  noul?: number;
  choice?: string;
  probabilities?: Record<string, number>;
  score?: number;
  legend?: Record<string, string>;
  confidence?: number;
}

export async function evaluate(
  state: unknown,
  questions: Record<string, TypeSafeQuestion>,
): Promise<Record<string, TypeSafeAnswer>> {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new Error(
      'TYPESAFE_API_KEY não configurada. Defina a variável de ambiente no Netlify (ou em .env com netlify dev).',
    );
  }

  const res = await fetch(TYPESAFE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state, model: 'jev-latest', questions }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TypeSafe API respondeu ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as { answers: Record<string, TypeSafeAnswer> };
  return data.answers;
}
