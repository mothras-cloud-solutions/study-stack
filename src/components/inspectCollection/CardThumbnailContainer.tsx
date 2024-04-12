import React, { useState, useEffect } from 'react';
import CardThumbnail from './CardThumbnail';

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collection_id: number;
  isArchived: boolean;
};

type CardThumbnailContainerProps = {
  collection_id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onArchiveToggle: (id: number) => void;
};

const CardThumbnailContainer: React.FC<CardThumbnailContainerProps> = ({
  collection_id,
  onEdit,
  onDelete,
  onArchiveToggle,
}) => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    if (collection_id) {
      fetch(`/api/flashcards/collection_id/${collection_id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setFlashcards(data);
        })
        .catch(error => {
          console.error('Error fetching flashcards:', error);
        });
    }
  }, [collection_id]);

  const toggleArchiveStatus = (id: number) => {
    const updatedFlashcards = flashcards.map(flashcard =>
      flashcard.id === id ? { ...flashcard, isArchived: !flashcard.isArchived } : flashcard
    );
    setFlashcards(updatedFlashcards);
    onArchiveToggle(id);
  };

  const displayedFlashcards = flashcards.filter(flashcard =>
    showArchived ? flashcard.isArchived : !flashcard.isArchived
  );

  return (
    <div>
      <button onClick={() => setShowArchived(!showArchived)} className="mb-4">
        {showArchived ? 'Show Unarchived' : 'Show Archived'}
      </button>

      <div className="box">
        <h2 className="title is-4 mb-3">Cards in this Deck ({displayedFlashcards.length})</h2>
        <div className="columns is-multiline">
          {displayedFlashcards.map(flashcard => (
            <CardThumbnail
              key={flashcard.id}
              flashcard={flashcard}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchiveToggle={toggleArchiveStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardThumbnailContainer;