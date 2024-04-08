import React from 'react';

interface Deck {
  id: number;
  title: string;
  description: string;
  cardCount: number;
}

interface DeckThumbnailProps {
  title: string;
  description: string;
  cardCount: number;
}

// DeckThumbnail
const DeckThumbnail: React.FC<DeckThumbnailProps> = ({ title, description, cardCount }) => { // Sample props
  return (
    <div className="card">
      <div className="card-content front-content">
        <div className="content">
          <p className="title is-5">{title}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="card-content back-content is-hidden">
        <div className="content">
          <p>{description}</p>
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item flip-button">{cardCount} cards</a>
      </footer>
    </div>
  );
};

interface DecksProps {
  decks: Deck[];
}

// DeckThumbnails Container/Box
const Decks: React.FC<DecksProps> = ({ decks }) => {
  return (
    <div className="box">
      <h2 className="title is-3">My Decks / Deck Selector</h2>
      <div className="columns">
        {decks.map(deck => (
          <div className="column is-one-quarter" key={deck.id}>
            <DeckThumbnail title={deck.title} description={deck.description} cardCount={deck.cardCount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Decks;
