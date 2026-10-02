import { useEffect, useRef, useState } from 'react';
import type { CardFront } from '../data/cards';
import { drawCard, askQuestion, submitGuess, revealCard, type RevealData } from '../api';
import { CardStage } from '../components/CardStage';
import { RevealPanel } from '../components/RevealPanel';

interface Msg {
  id: number;
  role: 'player' | 'ai';
  text: string;
  answer?: 'sim' | 'nao' | 'irrelevante' | 'refaca';
}

const CHIP_CLASS: Record<string, string> = {
  sim: 'sim',
  nao: 'nao',
  irrelevante: 'irrelevante',
  refaca: 'refaca',
};

let msgId = 0;

export function SoloMode({ onHome }: { onHome: () => void }) {
  const [card, setCard] = useState<CardFront | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [guessOpen, setGuessOpen] = useState(false);
  const [guess, setGuess] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<{ kind: 'close' | 'far'; text: string } | null>(null);
  const [reveal, setReveal] = useState<RevealData | null>(null);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const seenRef = useRef<number[]>([]);
  seenRef.current = seen;

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    void newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function newRound() {
    setBusy(true);
    setError(null);
    setReveal(null);
    setSolved(false);
    setGuessOpen(false);
    setGuess('');
    setGuessFeedback(null);
    setMessages([]);
    try {
      const c = await drawCard(seenRef.current);
      setCard(c);
      setSeen((s) => [...s, c.id]);
      setMessages([
        {
          id: msgId++,
          role: 'ai',
          text: 'Li o verso da carta. Faça perguntas que eu possa responder com Sim, Não, Irrelevante ou "Refaça sua pergunta" e descubra o que realmente aconteceu.',
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao sortear carta');
    } finally {
      setBusy(false);
    }
  }

  async function sendQuestion(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || !card || busy) return;
    setInput('');
    setError(null);
    setMessages((m) => [...m, { id: msgId++, role: 'player', text: q }]);
    setBusy(true);
    try {
      const res = await askQuestion(card.id, q);
      setMessages((m) => [...m, { id: msgId++, role: 'ai', text: res.label, answer: res.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao consultar a IA');
    } finally {
      setBusy(false);
    }
  }

  async function sendGuess() {
    const g = guess.trim();
    if (!g || !card || busy) return;
    setBusy(true);
    setError(null);
    setGuessFeedback(null);
    try {
      const res = await submitGuess(card.id, g);
      if (res.solved) {
        setSolved(true);
        setReveal(await revealCard(card.id));
      } else {
        setGuessFeedback({
          kind: res.score >= res.maxScore - 1 ? 'close' : 'far',
          text:
            res.score >= res.maxScore - 1
              ? 'Quase lá! Você capturou boa parte da história, mas falta um elemento importante.'
              : 'Ainda não é isso. Continue fazendo perguntas para descobrir o contexto.',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao consultar a IA');
    } finally {
      setBusy(false);
    }
  }

  async function giveUp() {
    if (!card || busy) return;
    setBusy(true);
    try {
      setSolved(false);
      setReveal(await revealCard(card.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao revelar a carta');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="game">
      <div className="game-top">
        <div>
          <h2>Contra a IA</h2>
          <span className="hint">A IA leu o verso da carta e só responde Sim, Não, Irrelevante ou Refaça sua pergunta.</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onHome}>← Início</button>
      </div>

      <div className="game-cols">
        <div>
          <CardStage card={card} facing={card ? 'front' : 'down'} />
        </div>

        <div className="panel">
          <div className="chat-log" ref={logRef}>
            {messages.map((m) =>
              m.role === 'player' ? (
                <div key={m.id} className="msg player">{m.text}</div>
              ) : (
                <div key={m.id} className="msg ai">
                  {m.answer ? (
                    <span className={`answer-chip ${CHIP_CLASS[m.answer]}`}>{m.text}</span>
                  ) : (
                    m.text
                  )}
                </div>
              ),
            )}
            {busy && card && (
              <div className="msg ai"><span className="typing"><i /><i /><i /></span></div>
            )}
            {!card && !busy && !error && <p className="empty-hint">Sorteando uma carta…</p>}
          </div>

          <form className="chat-form" onSubmit={sendQuestion}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Faça uma pergunta de sim/não…"
              disabled={!card || busy}
              maxLength={500}
            />
            <button className="btn btn-teal" type="submit" disabled={!card || busy || !input.trim()}>
              Perguntar
            </button>
          </form>

          <div className="side-actions">
            <button className="btn btn-orange btn-sm" onClick={() => setGuessOpen((v) => !v)} disabled={!card}>
              Acho que descobri a história
            </button>
            <button className="btn btn-ghost btn-sm" onClick={giveUp} disabled={!card || busy}>
              Revelar a história
            </button>
          </div>

          {guessOpen && (
            <div className="guess-box" style={{ marginTop: 12 }}>
              <textarea
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Descreva o que realmente aconteceu: quem, o quê e por quê…"
                maxLength={2000}
              />
              <div className="side-actions">
                <button className="btn btn-teal btn-sm" onClick={sendGuess} disabled={busy || !guess.trim()}>
                  Confirmar palpite
                </button>
              </div>
              {guessFeedback && (
                <div className={`guess-feedback ${guessFeedback.kind}`}>{guessFeedback.text}</div>
              )}
            </div>
          )}

          {error && <div className="error-banner">{error}</div>}
        </div>
      </div>

      {reveal && (
        <RevealPanel
          reveal={reveal}
          solved={solved}
          onNewRound={() => void newRound()}
          onHome={onHome}
        />
      )}
    </div>
  );
}
