import { useState } from 'react';
import { GroupMode } from './screens/GroupMode';
import { SoloMode } from './screens/SoloMode';
import { Rules } from './components/Rules';

type Screen = 'home' | 'group' | 'solo';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <button className="brand" onClick={() => setScreen('home')}>
          <span className="brand-mark">◈</span>
          ORG STORIES
        </button>
        <div className="header-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => setRulesOpen(true)}>
            Como jogar
          </button>
        </div>
      </header>

      {screen === 'home' && (
        <main className="home">
          <span className="home-eyebrow">Um jogo de antipadrões organizacionais</span>
          <h1>Org Stories</h1>
          <p className="home-sub">
            Descubra a história por trás da história. Faça perguntas que só podem ser
            respondidas com Sim, Não, Irrelevante ou "Refaça sua pergunta" e desvende
            o antipadrão escondido em cada carta.
          </p>
          <div className="mode-grid">
            <button className="mode-card" onClick={() => setScreen('group')}>
              <span className="mode-icon teal display" style={{ fontFamily: 'Oswald', fontWeight: 700 }}>3–6</span>
              <h2>Modo Grupo</h2>
              <p>
                3 a 6 pessoas em volta de um dispositivo. O narrador sorteia a carta,
                lê o verso em segredo e responde às perguntas do grupo.
              </p>
              <span className="btn btn-teal btn-sm">Jogar em grupo</span>
            </button>
            <button className="mode-card" onClick={() => setScreen('solo')}>
              <span className="mode-icon orange" style={{ fontFamily: 'Oswald', fontWeight: 700 }}>IA</span>
              <h2>Contra a IA</h2>
              <p>
                A IA lê o verso da carta e segura o segredo. Faça perguntas de sim/não
                e tente reconstruir a história completa.
              </p>
              <span className="btn btn-orange btn-sm">Desafiar a IA</span>
            </button>
          </div>
          <p className="home-footer">
            Baseado no jogo de cartas Org Stories · 16 histórias · antipadrões organizacionais
          </p>
        </main>
      )}

      {screen === 'group' && <GroupMode onHome={() => setScreen('home')} />}
      {screen === 'solo' && <SoloMode onHome={() => setScreen('home')} />}
      {rulesOpen && <Rules onClose={() => setRulesOpen(false)} />}
    </>
  );
}
