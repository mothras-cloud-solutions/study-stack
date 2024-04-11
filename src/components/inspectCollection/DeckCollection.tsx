import React, { useState, useEffect } from 'react';
import DeckSelector from './DeckSelector';
import CardThumbnailContainer from './CardThumbnailContainer';
import Actions from './Actions';
import { useNavigate } from 'react-router-dom';

type DeckType = {
  id: number;
  title: string;
  description: string;
  subjects: string[];
  flashcards?: any[];
};

type DeckCollectionProps = {
  uid: string | null;
};

const DeckCollection: React.FC<DeckCollectionProps> = ({ uid }) => {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      if (uid) {
        const response = await fetch(`/api/collections/user/${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDecks(data);
      }
    };

    fetchDecks();
  }, [uid]);

  const handleDeckSelect = (deck: DeckType) => {
    setSelectedDeck(deck);
  };

  return (
    <div>
      <DeckSelector decks={decks} onDeckSelect={handleDeckSelect} />
      {selectedDeck && (
        <>
          <CardThumbnailContainer
            collection_id={selectedDeck ? selectedDeck.id : 0}
            onEdit={() => {}}
            onDelete={() => {}}
            onArchiveToggle={() => {}}
          />
          <Actions selectedDeck={selectedDeck} />
        </>
      )}
    </div>
  );
};

export default DeckCollection;
