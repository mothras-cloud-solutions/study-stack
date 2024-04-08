import React, { useState } from 'react';

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
  // State to manage the archived status of flashcards
  const [flashcardsState, setFlashcardsState] = useState<FlashcardType[]>(flashcards);

  // Function to toggle the archived state of a flashcard
  const toggleArchive = (id: number) => {
    const updatedFlashcards = flashcardsState.map(flashcard => {
      if (flashcard.id === id) {
        return { ...flashcard, isArchived: !flashcard.isArchived };
      }
      return flashcard;
    });
    setFlashcardsState(updatedFlashcards);
  };

  const [showArchived, setShowArchived] = useState(false);
  const displayedFlashcards = flashcardsState.filter(flashcard => showArchived === !!flashcard.isArchived);

  return (
    <div>
      <button onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? 'Show Unarchived' : 'Show Archived'}
      </button>

      <div className="card-thumbnail-container">
        {displayedFlashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard-thumbnail">
            <div className="flashcard-term">{flashcard.term}</div>
            <div className="flashcard-definition">{flashcard.definition}</div>
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
