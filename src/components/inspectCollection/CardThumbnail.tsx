import React from 'react';

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
  isArchived: boolean;
};

type CardThumbnailProps = {
  flashcard: FlashcardType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onArchiveToggle: (id: number) => void;
};

const CardThumbnail: React.FC<CardThumbnailProps> = ({
  flashcard,
  onEdit,
  onDelete,
  onArchiveToggle,
}) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p><strong>Term:</strong> {flashcard.term}</p>
            <p><strong>Definition:</strong> {flashcard.definition}</p>
          </div>
        </div>
        <footer className="card-footer">
          <button className="card-footer-item" onClick={() => onEdit(flashcard.id)}>Edit</button>
          <button className="card-footer-item" onClick={() => onDelete(flashcard.id)}>Delete</button>
          <button className="card-footer-item" onClick={() => onArchiveToggle(flashcard.id)}>
            {flashcard.isArchived ? 'Unarchive' : 'Archive'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CardThumbnail;