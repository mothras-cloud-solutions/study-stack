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
  changeDeck: (deck: DeckType) => void;
};

const DeckCollection: React.FC<DeckCollectionProps> = ({ uid, changeDeck }) => {
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
    changeDeck(deck);
  };

  const handleDeleteDeckUpdate = (deletedDeckId) => {
    const updatedDecks = decks.filter(deck => deck.id !== deletedDeckId);
    setDecks(updatedDecks);
    setSelectedDeck(null);
  };

  return (
    <div>
      <DeckSelector decks={decks} onDeckSelect={handleDeckSelect} />
      {selectedDeck && (
        <>
          <Actions selectedDeck={selectedDeck} />
          <CardThumbnailContainer
            collection_id={selectedDeck ? selectedDeck.id : 0}
            onEdit={() => {}}
            onDelete={() => {}}
            onArchiveToggle={() => {}}
          />
          <Actions selectedDeck={selectedDeck} onStudy={onStudy} onDelete={handleDeleteDeckUpdate} />

        </>
      )}
    </div>
  );
};

export default DeckCollection;
