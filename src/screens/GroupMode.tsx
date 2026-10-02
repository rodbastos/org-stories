import { useState } from 'react';
import type { CardFront } from '../data/cards';
import { drawCard, revealCard, type RevealData } from '../api';
import { CardStage } from '../components/CardStage';
import { RevealPanel } from '../components/RevealPanel';

type Facing = 'down' | 'front' | 'back';
type TallyKey = 'sim' | 'nao' | 'irrelevante' | 'refaca';

const TALLY_LABELS: Record<TallyKey, string> = {
  sim: 'Sim',
  nao: 'Não',
  irrelevante: 'Irrelevante',
  refaca: 'Refaça',
};

export function GroupMode({ onHome }: { onHome: () => void }) {
  const [card, setCard] = useState<CardFront | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const [facing, setFacing] = useState<Facing>('down');
  const [tally, setTally] = useState<Record<TallyKey, number>>({ sim: 0, nao: 0, irrelevante: 0, refaca: 0 });
  const [reveal, setReveal] = useState<RevealData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDraw() {
    setLoading(true);
    setError(null);
    setReveal(null);
    try {
      const c = await drawCard(seen);
      setCard(c);
      setSeen((s) => [...s, c.id]);
      setFacing('down');
      setTally({ sim: 0, nao: 0, irrelevante: 0, refaca: 0 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao sortear carta');
    } finally {
      setLoading(false);
    }
  }

  async function handleReveal() {
    if (!card) return;
    setLoading(true);
    setError(null);
    try {
      setReveal(await revealCard(card.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao revelar a carta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="game">
      <div className="game-top">
        <div>
          <h2>Modo Grupo</h2>
          <span className="hint">Um dispositivo para o grupo todo — o narrador segura o segredo.</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onHome}>← Início</button>
      </div>

      <div className="game-cols">
        <div>
          <CardStage card={card} facing={facing} />
          {facing === 'back' && (
            <div className="narrator-note">
              Psst! Apenas o narrador deve olhar o verso da carta.
            </div>
          )}
        </div>

        <div className="panel">
          {!card ? (
            <>
              <p className="empty-hint">
                Reúna 3 a 6 pessoas ao redor deste dispositivo. Alguém será o narrador da rodada:
                sorteia a carta, mostra a frente ao grupo e lê o verso em segredo.
              </p>
              <button className="btn btn-teal" onClick={handleDraw} disabled={loading}>
                {loading ? 'Sorteando…' : 'Sortear uma carta'}
              </button>
            </>
          ) : (
            <>
              <h3 style={{ margin: '0 0 4px', textTransform: 'uppercase' }}>{card.title}</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.5, marginTop: 0 }}>
                {card.story}
              </p>

              <div className="side-actions">
                {facing === 'down' && (
                  <button className="btn btn-teal" onClick={() => setFacing('front')}>
                    Virar e mostrar ao grupo
                  </button>
                )}
                {facing === 'front' && (
                  <button className="btn" onClick={() => setFacing('back')}>
                    Sou o narrador — ler o verso
                  </button>
                )}
                {facing === 'back' && (
                  <button className="btn btn-ghost" onClick={() => setFacing('front')}>
                    Voltar para a frente
                  </button>
                )}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: 4 }}>
                Conte as respostas do narrador (toque para registrar):
              </p>
              <div className="tally">
                {(Object.keys(TALLY_LABELS) as TallyKey[]).map((k) => (
                  <button
                    key={k}
                    className="tally-chip"
                    onClick={() => setTally((t) => ({ ...t, [k]: t[k] + 1 }))}
                  >
                    {TALLY_LABELS[k]}
                    <span className="count">{tally[k]}</span>
                  </button>
                ))}
              </div>

              <div className="side-actions" style={{ marginTop: 20 }}>
                <button className="btn btn-orange" onClick={handleReveal} disabled={loading}>
                  O grupo descobriu a história
                </button>
                <button className="btn btn-ghost" onClick={handleDraw} disabled={loading}>
                  Sortear outra carta
                </button>
              </div>
            </>
          )}
          {error && <div className="error-banner">{error}</div>}
        </div>
      </div>

      {reveal && (
        <RevealPanel
          reveal={reveal}
          solved
          onNewRound={() => { setReveal(null); handleDraw(); }}
          onHome={onHome}
        />
      )}
    </div>
  );
}
