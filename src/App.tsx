import React, { useState } from 'react';
import DeckSelector from './components/inspectCollection/DeckSelector';
import CardThumbnailContainer from './components/inspectCollection/CardThumbnailContainer';

import collectionData from './components/inspectCollection/collectionData.json';
import flashcardData from './components/inspectCollection/flashcardData.json';

type DeckType = {
  collectionId: number;
  title: string;
  description: string;
  subjects: string[];
};

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
};


function App() {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);

  // Create a handler for when a deck is selected
  const handleDeckSelect = (deck: DeckType) => {
    setSelectedDeck(deck);
  };

  // Filter the flashcards for the selected deck
  const selectedFlashcards = selectedDeck
    ? flashcardData.filter(fc => fc.collectionId === selectedDeck.collectionId)
    : [];

  return (
    <div>
      <h1>Study Stack</h1>
      <DeckSelector decks={collectionData} onDeckSelect={handleDeckSelect} />
      {selectedDeck && (
        <CardThumbnailContainer flashcards={selectedFlashcards} />
      )}
    </div>
  );
}

export default App;