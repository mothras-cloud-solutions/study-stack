import React from 'react';

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
};

type CardThumbnailProps = {
  flashcard: FlashcardType;
};

const CardThumbnail: React.FC<CardThumbnailProps> = ({ flashcard }) => {
  console.log('Rendering CardThumbnail, flashcard:', flashcard);

  return (
    <div className="card-thumbnail">
      <div className="term">
        <strong>Term:</strong> {flashcard.term}
      </div>
      <div className="definition">
        <strong>Definition:</strong> {flashcard.definition}
      </div>
    </div>
  );
};

export default CardThumbnail;
