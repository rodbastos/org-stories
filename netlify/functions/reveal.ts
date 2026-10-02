import type { Config } from '@netlify/functions';
import { CARDS } from './cards-data';
import { json, error, readBody } from './lib/http';

export default async (req: Request) => {
  const body = await readBody<{ cardId?: number }>(req);
  const card = CARDS.find((c) => c.id === body?.cardId);
  if (!card) return error('Carta inválida');

  return json({
    id: card.id,
    title: card.title,
    context: card.context,
    reflection: card.reflection,
    antipattern: card.antipattern,
    backImage: card.backImage,
  });
};

export const config: Config = {
  path: '/api/reveal',
  method: 'POST',
};
