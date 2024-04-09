import React, { useState } from 'react';
import DeckSelector from './DeckSelector';
import CardThumbnailContainer from './CardThumbnailContainer';
import collectionData from './collectionData.json';
import flashcardData from './flashcardData.json';

type DeckType = {
  collectionId: number;
  title: string;
  description: string;
  subjects: string[];
};

const DeckCollection: React.FC = () => {
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
      <DeckSelector decks={collectionData} onDeckSelect={handleDeckSelect} />
      {selectedDeck && (
        <CardThumbnailContainer flashcards={selectedFlashcards} />
      )}
    </div>
  );
};

export default DeckCollection;