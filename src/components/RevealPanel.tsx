import type { RevealData } from '../api';

interface Props {
  reveal: RevealData;
  solved: boolean;
  onNewRound: () => void;
  onHome: () => void;
}

export function RevealPanel({ reveal, solved, onNewRound, onHome }: Props) {
  return (
    <div className="reveal-overlay" onClick={(e) => e.target === e.currentTarget && onNewRound()}>
      <div className="reveal-panel">
        <h3>{solved ? 'História descoberta!' : 'A história completa'}</h3>
        <span className="antipattern">Antipadrão: {reveal.antipattern}</span>
        <div className="reveal-grid">
          <img src={reveal.backImage} alt={`Verso da carta ${reveal.title}`} />
          <div>
            <div className="reveal-section">
              <h4>Contexto</h4>
              <p>{reveal.context}</p>
            </div>
            <div className="reveal-section">
              <h4>Pense sobre</h4>
              <p>{reveal.reflection}</p>
            </div>
            <p className="qr-note">
              Aponte a câmera para o QR code no verso da carta para ler mais sobre o antipadrão.
            </p>
          </div>
        </div>
        <div className="reveal-actions">
          <button className="btn btn-teal" onClick={onNewRound}>Nova rodada</button>
          <button className="btn btn-ghost" onClick={onHome}>Voltar ao início</button>
        </div>
      </div>
    </div>
  );
}
