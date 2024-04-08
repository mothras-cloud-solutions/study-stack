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

  // Update the function to accept a DeckType object
  const handleSelectDeck = (deck: DeckType) => {
    setSelectedDeck(deck);
  };

  return (
    <div>
      <DeckSelector decks={collectionData} onDeckSelect={handleSelectDeck} />
      {selectedDeck && (
        <CardThumbnailContainer
          flashcards={flashcardData.filter(fc => fc.collectionId === selectedDeck.collectionId)}
        />
      )}
      <button onClick={() => console.log('Study')}>Study</button>
      <button onClick={() => console.log('Edit')}>Edit</button>
    </div>
  );
};

export default DeckCollection;
