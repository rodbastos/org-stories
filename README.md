# Org Stories

Versão digital do jogo de cartas **Org Stories** — um jogo sobre antipadrões organizacionais, no estilo de histórias laterais ("situation puzzles").

## Como funciona

Em cada rodada, alguém sorteia uma carta. A frente (história + imagem) é mostrada ao grupo; o verso (o contexto real) fica em segredo com o narrador. O grupo precisa descobrir a história fazendo perguntas que só podem ser respondidas com **Sim**, **Não**, **Irrelevante** ou **Refaça sua pergunta**. Ao final, todos refletem sobre o antipadrão.

## Modos de jogo

- **Modo Grupo (3–6 pessoas)**: um dispositivo serve como o baralho. O narrador sorteia a carta, mostra a frente ao grupo e lê o verso em segredo. O app registra a contagem de respostas e revela o contexto + reflexão no fim da rodada.
- **Contra a IA**: a IA segura o verso da carta e responde às suas perguntas via **TypeSafe System One (Jev)**. Quando achar que descobriu, descreva a história completa — um `score` do Jev avalia se você acertou o contexto essencial.

## Stack

- React + TypeScript + Vite (frontend, `src/`)
- Netlify Functions (`netlify/functions/`) — endpoints `/api/draw`, `/api/ask`, `/api/guess`, `/api/reveal`
- API TypeSafe (`jev-latest`) para as respostas da IA: `choice` (Sim/Não/Irrelevante/Refaça) e `score` (avaliação do palpite final)
- As imagens das cartas (`public/cards/`) foram renderizadas a partir do PDF oficial em `cards/`

O contexto oculto de cada carta **não** é enviado ao navegador no modo IA — fica apenas no servidor.

## Desenvolvimento local

```bash
npm install
cp .env.example .env   # preencha TYPESAFE_API_KEY (necessário só para o modo IA)
npm run dev            # http://localhost:5173 — /api/* é servido pelo middleware do Vite
```

Alternativa com a CLI oficial: `netlify dev` (usa o `netlify.toml`).

## Deploy no Netlify

1. Suba este repositório para o GitHub/GitLab.
2. Em https://app.netlify.com → **Add new site → Import an existing project** e selecione o repo. O `netlify.toml` já define `build = npm run build`, `publish = dist` e `functions = netlify/functions`.
3. Em **Site configuration → Environment variables**, adicione `TYPESAFE_API_KEY` com sua chave de https://typesafe.ai.
4. Deploy. O modo Grupo funciona mesmo sem a chave; o modo IA exige a variável.

Via CLI: `npm i -g netlify-cli && netlify deploy --build --prod`.

## Estrutura

```
public/cards/           PNGs frente/verso das 16 cartas + telas de instruções
src/                    app React (home, modo grupo, modo IA, regras)
src/data/cards.ts       dados públicos (frente) das cartas
netlify/functions/      API serverless + dados completos (contexto, reflexão, antipadrão)
cards/                  PDF original e imagens renderizadas
```
