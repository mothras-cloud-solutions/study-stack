import React, { useState, useEffect } from 'react';
import CardThumbnail from './CardThumbnail';

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
  isArchived: boolean;
};

type CardThumbnailContainerProps = {
  flashcards: FlashcardType[];
  onEdit: (flashcardId: number) => void;
  onDelete: (flashcardId: number) => void;
  onArchiveToggle: (flashcardId: number) => void;
};

const CardThumbnailContainer: React.FC<CardThumbnailContainerProps> = ({
  flashcards,
  onEdit,
  onDelete,
  onArchiveToggle,
}) => {
  const [showArchived, setShowArchived] = useState(false);
  const [localFlashcards, setLocalFlashcards] = useState(flashcards);

  useEffect(() => {
    setLocalFlashcards(flashcards);
  }, [flashcards]);

  const toggleArchiveStatus = (id: number) => {
    const updatedFlashcards = localFlashcards.map(flashcard =>
      flashcard.id === id ? { ...flashcard, isArchived: !flashcard.isArchived } : flashcard
    );
    setLocalFlashcards(updatedFlashcards);
    onArchiveToggle(id);
  };

  const displayedFlashcards = localFlashcards.filter(flashcard =>
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
