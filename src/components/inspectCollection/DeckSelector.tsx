
import React from 'react';

import { importFile } from './utils/importFile.ts';

type CollectionType = {
  id: number;
  title: string;
};

type DeckSelectorProps = {
  decks: CollectionType[];
  onDeckSelect: (collection: CollectionType) => void;
  uid: string | null;
  setRefreshDecks: (refresh: boolean) => void;
  refreshDecks: boolean;
};

const DeckSelector: React.FC<DeckSelectorProps> = ({ decks, onDeckSelect, uid, setRefreshDecks, refreshDecks }) => {
  // console.log('Rendering DeckSelector, decks:', decks);

  const handleImportDeck = async () => {
    // console.log('Import Deck clicked');
    importFile(uid, setRefreshDecks, refreshDecks);
  };

  return (
    <div className="w-full mb-4">
      <label htmlFor="collection-select" className="block text-lg font-medium text-gray-700 mb-2">
        Decks:
      </label>
      <select
        id="collection-select"
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
          <option key={deck.id} value={index} className="text-lg">
            {deck.title}
          </option>
        ))}
      </select>
      <button onClick={handleImportDeck} className="action-button">Import Deck</button>
    </div>
  );
};

export default DeckSelector;
