import type { Config } from '@netlify/functions';
import { CARDS } from './cards-data';
import { json, error, readBody } from './lib/http';

export default async (req: Request) => {
  const body = await readBody<{ excludeIds?: number[] }>(req);
  const exclude = new Set(body?.excludeIds ?? []);
  const pool = CARDS.filter((c) => !exclude.has(c.id));
  const candidates = pool.length > 0 ? pool : CARDS;
  const card = candidates[Math.floor(Math.random() * candidates.length)];
  if (!card) return error('Nenhuma carta disponível', 500);

  return json({
    id: card.id,
    slug: card.slug,
    title: card.title,
    story: card.story,
    frontImage: card.frontImage,
    backImage: card.backImage,
  });
};

export const config: Config = {
  path: '/api/draw',
  method: 'POST',
};
