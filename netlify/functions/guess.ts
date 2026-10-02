import type { Config } from '@netlify/functions';
import { CARDS } from './cards-data';
import { evaluate } from './lib/typesafe';
import { json, error, readBody } from './lib/http';

const LEVELS = [
  'O palpite está errado ou captura quase nada do contexto real da história.',
  'O palpite captura um detalhe ou elemento periférico do contexto, mas falta a essência do que aconteceu.',
  'O palpite captura boa parte do contexto, mas ainda falta um elemento importante para explicar a história.',
  'O palpite descreve corretamente o contexto essencial: quem, o que aconteceu de fato e por quê.',
];

export default async (req: Request) => {
  const body = await readBody<{ cardId?: number; guess?: string }>(req);
  const card = CARDS.find((c) => c.id === body?.cardId);
  const guess = body?.guess?.trim();

  if (!card) return error('Carta inválida');
  if (!guess || guess.length > 2000) return error('Palpite inválido');

  try {
    const answers = await evaluate(
      {
        historia_visivel: card.story,
        contexto_oculto: card.context,
        palpite_do_jogador: guess,
      },
      {
        completude: {
          type: 'score',
          instructions:
            'Neste jogo, o jogador vê a `historia_visivel` e precisa descobrir o `contexto_oculto`. Avalie o `palpite_do_jogador`: o quanto ele acertou o contexto real da história? Não exige as mesmas palavras — avalie se a ideia essencial (o que realmente aconteceu e por quê) foi compreendida.',
          criteria: LEVELS,
        },
      },
    );

    const score = answers.completude;
    const value = score.score ?? 0;
    return json({
      score: value,
      maxScore: LEVELS.length - 1,
      solved: value >= LEVELS.length - 1 - 0.5,
      level: score.legend?.[String(Math.round(value))] ?? null,
      confidence: score.confidence ?? null,
    });
  } catch (e) {
    return error(e instanceof Error ? e.message : 'Erro ao consultar a IA', 502);
  }
};

export const config: Config = {
  path: '/api/guess',
  method: 'POST',
};
