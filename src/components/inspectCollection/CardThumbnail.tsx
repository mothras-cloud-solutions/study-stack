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
  onArchiveToggle: (id: number) => void;
};

const CardThumbnail: React.FC<CardThumbnailProps> = ({
  flashcard,

  onArchiveToggle,
}) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p><strong>Prompt:</strong> {flashcard.term}</p>
            <p><strong>Response:</strong>  <span dangerouslySetInnerHTML={{ __html: flashcard.definition }} /></p>
          </div>
        </div>
        <footer className="card-footer">
          <button className="card-footer-item" onClick={() => onArchiveToggle(flashcard.id)}>
            {flashcard.isArchived ? 'Unarchive' : 'Archive'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CardThumbnail;