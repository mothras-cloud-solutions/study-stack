// You can use this file to create the edit card component view
import React, { useState } from 'react';

const EditCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to flip the card on click
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="box">
      <h2 className="title is-2">Edit Card</h2>
      <nav className="level">
        <div className="level-left">
          <div className="tags are-large">
            {/* You can change, edit, add, and delete this buttons/tags based on the view */}
            <span className="tag">Shapes</span>
            <span className="tag">Font</span>
            <span className="tag has-text-light">Edit</span>
            <span className="tag has-text-light">Edit</span>
          </div>
        </div>
        <div className="level-right">
          <div className="tags are-large">
            <span className="tag has-text-light">Edit</span>
            <span className="tag has-text-light">Edit</span>
          </div>
        </div>
      </nav>
      <div className="flip-container" onClick={flipCard}>
        <div className={`flip-card${isFlipped ? ' is-flipped' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3 className="title is-3">Front Side</h3>
              <p>This is the front side of the card.</p>
            </div>
            <div className="flip-card-back">
              <h3 className="title is-3">Back Side</h3>
              <p>This is the back side of the card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
