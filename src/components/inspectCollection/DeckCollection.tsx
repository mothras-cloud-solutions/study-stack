//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import DeckSelector from './DeckSelector';
import CardThumbnailContainer from './CardThumbnailContainer';
import Actions from './Actions';
//import { useAuth } from './AuthContext';

type DeckType = {
  id: number;
  title: string;
  description: string;
  subjects: string[];
};

const DeckCollection: React.FC = () => {
  //const [decks, setDecks] = useState<DeckType[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  //const { userId } = useAuth();

  // useEffect(() => {
  //   if (userId) {
  //     fetch(`/api/collections/user/${userId}`)
  //       .then(response => response.json())
  //       .then(data => setDecks(data))
  //       .catch(error => console.error('Error fetching collections:', error));
  //   }
  // }, [userId]);

  const handleDeckSelect = (deck: DeckType) => {
    setSelectedDeck(deck);
  };

  return (
    <div>
      <DeckSelector onDeckSelect={handleDeckSelect} />
      {selectedDeck && (
        <>
          <CardThumbnailContainer
            collection_id={selectedDeck.id}
            onEdit={() => {}}
            onDelete={() => {}}
            onArchiveToggle={() => {}}
          />
          <Actions />
        </>
      )}
    </div>
  );
};

export default DeckCollection;
