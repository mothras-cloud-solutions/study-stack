import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Skeleton/components/Pagination';
import StudyCanvas from '../cardEditor/StudyCanvas';
import { onAuthStateChange } from '../../../firebase/firebase';
import { User } from 'firebase/auth';

interface CardProps {
  card: {
    term: string;
    definition: string;
    starred: number;
    id: number;
    deck_title: string;
    canvas_back: string;
    canvas_front: string;
  };
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  length: number;
  studyDeck: any[];
  setStudyDeck: React.Dispatch<React.SetStateAction<any[]>>;
  shuffleTheDeck: () => void;
}

const Card: React.FC<CardProps> = ({
  card,
  setIndex,
  index,
  length,
  studyDeck,
  setStudyDeck,
  shuffleTheDeck,
}) => {
  const navigate = useNavigate();
  const { term, definition, starred, id, deck_title, canvas_back, canvas_front } = card;
  const currPosition = index + 1;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePageClick = (pageIndex: number) => {
    setIndex(pageIndex);
    setIsFlipped(false);
  };

  const handlePrevClick = () => {
    let newIndex = index - 1;
    if (newIndex >= 0) {
      setIsFlipped(false);
      setIndex(newIndex);
    } else {
      console.log("That's far enough");
    }
  };

  const handleNextClick = () => {
    let newIndex = index + 1;
    if (studyDeck && studyDeck.length > 0 && newIndex < studyDeck.length) {
      setIsFlipped(false);
      setIndex(newIndex);
    } else {
      console.log("No more cards or the deck is empty");
    }
  };

  const handleStudyAgainClick = () => {
    if (starred === 0) {
      axios.put(`/api/flashcards/${id}/starred`).then(() => {
        console.log('starred should be changed to 1');
      });
    }
    handleNextClick();
  };

  const handleGotItClick = () => {
    if (starred === 1) {
      axios.put(`/api/flashcards/${id}/starred`).then(() => {
        console.log('starred should be changed back to 0');
      });
    }
    handleNextClick();
  };

  const handleDoneClick = () => {
    setIndex(0);
    navigate('/collections');
  };

  const handleShuffleClick = () => {
    shuffleTheDeck();
    setIsFlipped(false);
  };
  return (
    <div className='box'>
      <h2 className="title is-2">{deck_title}</h2>
      <span className='flip-notice tag is-link is-light is-outlined is-small'>Click on a card to flip it</span>
      <span className='tag index-count is-light'>Card {currPosition}/{length}</span>
      {starred === 1 && (
        <span className='starr-prompt'>This question was challenging for you, try to get it this time!</span>
      )}
      <nav className="nav">
        <div className='left'></div>
        <div className="right">
          <div className="tags are-large"></div>
        </div>
      </nav>
      <div className="flip-container" onClick={flipCard}>
        <div className='flip-card' id="studyCanvas" style={{ zIndex: 50, position: 'absolute', width: '100%', height: '100%' }}>
          <StudyCanvas front={canvas_front} back={canvas_back} index={index} flipped={isFlipped} />
        </div>
        <div className={`flip-card${isFlipped ? ' is-flipped' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              {!isFlipped && <h3 className="title is-3">{term}</h3>}
            </div>
            <div className="flip-card-back">
              <span className="definition-study" dangerouslySetInnerHTML={{ __html: definition }} />
            </div>
          </div>
        </div>
      </div>
      <div className='buttons'>
        <Pagination
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          onPageClick={handlePageClick}
          onStudyAgainClick={handleStudyAgainClick}
          onGotItClick={handleGotItClick}
          onDoneClick={handleDoneClick}
          onShuffleClick={handleShuffleClick}
          index={index}
          length={length}
        />
      </div>
    </div>
  );
};

export default Card;
