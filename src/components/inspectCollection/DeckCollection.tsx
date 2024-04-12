


import React, { useState, useEffect } from 'react';
import DeckSelector from './DeckSelector';
import CardThumbnailContainer from './CardThumbnailContainer';
import Actions from './Actions';
import Footer from '../Skeleton/components/Footer';

type DeckType = {
  id: number;
  title: string;
  description: string;
  subjects: string[];
  flashcards?: any[];
};

type DeckCollectionProps = {
  uid: string | null;
  currentCards: any[];
  changeDeck: (deck: DeckType) => void;
};

const DeckCollection: React.FC<DeckCollectionProps> = ({ uid, currentCards, changeDeck }) => {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [refreshDecks, setRefreshDecks] = useState<boolean>(false);

  useEffect(() => {
    if (uid) {
      const fetchDecks = async () => {
        const response = await fetch(`/api/collections/user/${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDecks(data);
      };

      fetchDecks();
    }
  }, [uid, refreshDecks]);

  useEffect(() => {
    if (selectedDeck && currentCards && currentCards.length > 0) {
      const updatedDeck = { ...selectedDeck, flashcards: currentCards };
      setSelectedDeck(updatedDeck);
      changeDeck(updatedDeck);
    }
  }, [currentCards, selectedDeck, changeDeck, uid]);

  const handleDeckSelect = (deck: DeckType) => {
    const deckWithCards = decks.find(d => d.id === deck.id) || deck;
    setSelectedDeck(deckWithCards);
    changeDeck(deckWithCards);
  };

  const handleDeleteDeckUpdate = (deletedDeckId: number) => {
    const updatedDecks = decks.filter(deck => deck.id !== deletedDeckId);
    setDecks(updatedDecks);
    setSelectedDeck(null);
  };

  return (
    <>
    <div>
      <DeckSelector decks={decks} onDeckSelect={handleDeckSelect} uid={uid} setRefreshDecks={setRefreshDecks} refreshDecks={refreshDecks} />
      {selectedDeck ? (
        <>
          <Actions selectedDeck={selectedDeck} currentCards={currentCards} onDelete={handleDeleteDeckUpdate} />
          <CardThumbnailContainer collection_id={selectedDeck.id} />
        </>
      ) : <p>Please select a deck.</p>}
      <Footer />
    </div>
     </>
  );
};

export default DeckCollection;