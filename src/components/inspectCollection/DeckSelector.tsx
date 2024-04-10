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
    <div className="w-full mb-4">
      <label htmlFor="deck-select" className="block text-lg font-medium text-gray-700 mb-2">
        Decks:
      </label>
      <select
        id="deck-select"
        className="block w-full pl-4 pr-10 py-3 text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
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
          <option key={deck.collectionId} value={index} className="text-lg">
            {deck.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelector;
