import type { Config } from '@netlify/functions';
import { CARDS } from './cards-data';
import { evaluate } from './lib/typesafe';
import { json, error, readBody } from './lib/http';

const LABELS: Record<string, string> = {
  sim: 'Sim',
  nao: 'Não',
  irrelevante: 'Irrelevante',
  refaca: 'Refaça sua pergunta',
};

export default async (req: Request) => {
  const body = await readBody<{ cardId?: number; question?: string }>(req);
  const card = CARDS.find((c) => c.id === body?.cardId);
  const question = body?.question?.trim();

  if (!card) return error('Carta inválida');
  if (!question || question.length > 500) return error('Pergunta inválida');

  try {
    const answers = await evaluate(
      {
        historia_visivel: card.story,
        contexto_oculto: card.context,
        pergunta_do_jogador: question,
      },
      {
        resposta: {
          type: 'choice',
          instructions:
            'Este é um jogo de histórias laterais (estilo "situation puzzle"). O jogador vê a `historia_visivel` e faz uma `pergunta_do_jogador` tentando descobrir o `contexto_oculto`. Como narrador, responda à pergunta estritamente com base no `contexto_oculto`. Escolha a única resposta correta.',
          criteria: {
            sim: 'A pergunta é de sim/não e, com base no contexto oculto, a resposta é afirmativa.',
            nao: 'A pergunta é de sim/não e, com base no contexto oculto, a resposta é negativa.',
            irrelevante:
              'A pergunta é de sim/não, mas a resposta não está no contexto oculto ou não ajuda a descobrir a história (não importa, não é relevante).',
            refaca:
              'A pergunta não pode ser respondida com sim ou não (é aberta, ambígua, tem mais de uma pergunta, ou é um palpite da história inteira).',
          },
        },
      },
    );

    const answer = answers.resposta;
    return json({
      answer: answer.choice ?? 'refaca',
      label: LABELS[answer.choice ?? 'refaca'] ?? 'Refaça sua pergunta',
      confidence: answer.confidence ?? null,
    });
  } catch (e) {
    return error(e instanceof Error ? e.message : 'Erro ao consultar a IA', 502);
  }
};

export const config: Config = {
  path: '/api/ask',
  method: 'POST',
};
