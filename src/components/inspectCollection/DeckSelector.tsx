import React from 'react';

type DeckType = {
  collectionId: number;
  title: string;
};

type DeckSelectorProps = {
  decks: DeckType[];
  onDeckSelect: (deck: DeckType) => void;
};

const DeckSelector: React.FC<DeckSelectorProps> = ({ decks, onDeckSelect }) => {
  return (
    <div>
      <label htmlFor="deck-select">Decks:</label>
      <select
        id="deck-select"
        defaultValue=""
        onChange={(e) => {
          const index = parseInt(e.target.value, 10);
          if (index >= 0 && index < decks.length) {
            onDeckSelect(decks[index]);
          }
        }}
      >
        <option value="" disabled>
          Please select a deck
        </option>
        {decks.map((deck, index) => (
          <option key={deck.collectionId} value={index}>
            {deck.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelector;