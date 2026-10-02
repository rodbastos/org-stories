import type { CardFront } from '../data/cards';

type Facing = 'down' | 'front' | 'back';

export function CardStage({ card, facing }: { card: CardFront | null; facing: Facing }) {
  return (
    <div className="card-stage">
      <div className={`flip-inner ${facing === 'back' ? 'show-back' : ''}`}>
        <div className="card-face front">
          {card && facing !== 'down' && <img src={card.frontImage} alt={`Frente da carta ${card.title}`} />}
        </div>
        <div className="card-face back">
          {card && <img src={card.backImage} alt={`Verso da carta ${card.title}`} />}
        </div>
      </div>
      <div className={`card-cover ${facing === 'down' || !card ? '' : 'hidden'}`}>
        <span className="deck-icon">◈</span>
        ORG STORIES
      </div>
    </div>
  );
}
