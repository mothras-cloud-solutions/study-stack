import React, { useEffect, useState } from 'react';
import CardThumbnail from './CardThumbnail';

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
  isArchived?: boolean;
};

type CardThumbnailContainerProps = {
  flashcards: FlashcardType[];
  onEdit: (flashcardId: number) => void;
  onStudy: (flashcardId: number) => void;
};

const CardThumbnailContainer: React.FC<CardThumbnailContainerProps> = ({ flashcards, onEdit, onStudy }) => {
  // Initialize the local state with the flashcards prop
  const [flashcardsState, setFlashcardsState] = useState<FlashcardType[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  // Use the useEffect hook to update the local state whenever the flashcards prop changes
  useEffect(() => {
    setFlashcardsState(flashcards);
  }, [flashcards]);

  // Handler to toggle the archived status of a flashcard
  const toggleArchive = (id: number) => {
    const updatedFlashcards = flashcardsState.map(flashcard =>
      flashcard.id === id ? { ...flashcard, isArchived: !flashcard.isArchived } : flashcard
    );
    setFlashcardsState(updatedFlashcards);
  };

  // Filter the flashcards based on the showArchived state
  const displayedFlashcards = flashcardsState.filter(flashcard =>
    showArchived === !!flashcard.isArchived
  );

  return (
    <div>
      <button onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? 'Show Unarchived' : 'Show Archived'}
      </button>
      <div className="card-thumbnail-container">
        {displayedFlashcards.map(flashcard => (
          <div key={flashcard.id} className="flashcard-thumbnail">
            <CardThumbnail flashcard={flashcard} />
            <div className="flashcard-actions">
              <button onClick={() => onEdit(flashcard.id)}>Edit</button>
              <button onClick={() => onStudy(flashcard.id)}>Study</button>
              <button onClick={() => toggleArchive(flashcard.id)}>
                {flashcard.isArchived ? 'Unarchive' : 'Archive'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardThumbnailContainer;
