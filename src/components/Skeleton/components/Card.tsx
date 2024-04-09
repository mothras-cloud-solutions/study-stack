// import React, { useState } from 'react';

// const Card: React.FC<{term: string,
//    definition: string,
//   keywords:string,
// confidenceLevel: number}> = ({ term, definition, keywords, confidenceLevel }) => {
//   return <div className='card-box'>
//    <h2>Card Title</h2>
//   <nav className="nav">
//     <div className='left'>
//         </div>
//     <div className="right">
//       <div className="tags are-large">
//         <span className="tag">Edit</span>
//         <span className="tag">Settings</span>
//       </div>
//     </div>
//   </nav>
//  <div className="flip-container">
//       <div className="flip-card">
//         <div className="flip-card-inner">
//           <div className="flip-card-front">
//             <h3 className="title is-3">Front Side</h3>
//             <p>{term}</p>
//           </div>
//           <div className="flip-card-back">
//             <h3 className="title is-3">Back Side</h3>
//             <p>{definition}</p>
//           </div>
//         </div>
//       </div>
//     </div>
// </div>
// }

// export default Card;


import React, { useState } from 'react';
import Pagination from './Pagination';

const Flashcard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to flip the card on click
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="box">
      <h2 className="title is-2">Deck Title</h2>
      <nav className="level">
        <div className="level-left">
          <div className="tags are-large">
            {/* You can change this buttons/tags based on the view */}
            <span className="tag ">Flashcards</span>
            <span className="tag has-text-light">Learn</span>
            <span className="tag has-text-light">Test</span>
            <span className="tag has-text-light">Shuffle</span>
          </div>
        </div>
        <div className="level-right">
          <div className="tags are-large">
            <span className="tag has-text-light">Edit</span>
            <span className="tag has-text-light">Settings</span>
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
      {/* Pagination component for card depending on the view */}
      {/* <Pagination sdfsd/> */}
    </div>
  );
};

export default Flashcard;
