import React, { useState } from 'react';
import axios from 'axios';

// const Card: React.FC<{term: string,
//   definition: string,
//  keywords:string,
// confidenceLevel: number}>
export default function Card ({card, setIndex, index, length, studyDeck, setStudyDeck, shuffleTheDeck}) {

  const {term, definition, starred, id, deck_title} = card;

// temp state, with the endpoint I'll just hit the backend
  // const [starryNight, setStarryNight] = useState(starred);


  const [isFlipped, setIsFlipped] = useState(false);

    // Function to flip the card on click
    const flipCard = () => {
      setIsFlipped(!isFlipped);
    };

  // Build confidence increasing functionality later

  //figure out how to add fontawesome icon - talk to Raul

  // routes needed - update starred
  // later - update confidence


  // routes below
  // PUT /api/flashcards/:id/confidenceLevel
  // PUT /api/flashcards/:id/starred


  function handleClick(e) {
    e.preventDefault();
    let buttonClicked = e.target.innerText

    if (buttonClicked === "Skip Back"){
      let newIndex = index - 1;
      if (newIndex < 0){
        console.log("That's far enough")
      } else {
        setIsFlipped(false);
        setIndex(newIndex)
      }
    } else if (buttonClicked === "Skip Forward"){
      let newIndex = index + 1;
      if (newIndex < length){
        setIsFlipped(false);
        setIndex(newIndex);
      } else {
        console.log("No more cards")
      }
    } else if (buttonClicked === "Study again") {
      // add a property to this card object ("StudyAgain : true")
      // then change its position in the array to the length to put it at the end of the arr
      // then delete its current index from the array
      // Never mind - they want to instead persist a star or something. Will comment this out for now

      // studyDeck[index].studyAgain = true;
      // studyDeck[length] = studyDeck[index];
      // let newDeck = studyDeck.toSpliced(index, 1)
      // setStudyDeck(newDeck);


      // insert axios call once we get the route
      // only toggle it if the star is 0 (what if they got it wrong twice?)
      if (starred === 0){
        axios.put(`http://localhost:3000/api/flashcards/${id}/starred`).then(() => {
          console.log('starred should be changed to 1')
        })
      }
      const newIndex = index + 1;
      if (newIndex < length){
        setIsFlipped(false);
        setIndex(newIndex);
      } else {
        // implement "Done" functionality here once route is ready
        console.log("No more cards")
      }


    } else if (buttonClicked === "Got it!") {
      // increment confidence in the backend route,
      // for now just skip to the next cardrrrrr
      // should we only move to the next card when they click next?
      // then got it can just update the confidence instead
      if (starred === 1){
        axios.put(`http://localhost:3000/api/flashcards/${id}/starred`).then(() => {
          console.log('starred should be changed back to 0')
        })
      }
      const newIndex = index + 1;
      if (newIndex < length){
        setIsFlipped(false);
        setIndex(newIndex)
      } else {
        console.log("No more cards")
      }
    } else if (buttonClicked === "Done") {
      console.log("Here's where I'll route to another page")
      // needs another page to go to with the react router etc.
      setIndex(0); // for now
    } else if (buttonClicked === "Shuffle") {
      shuffleTheDeck();
      setIsFlipped(false);
    }
    return
  }

  // add conditional that reads the starred value and displays something in the return statement.
  // make "Study again" send the directions to the DB to update the field to have 1 and go to the next card.
  // add a conditional inside "got it" that not only updates the confidence in the backend, but checks to see
  // "If" the current card has starred set to 1. If so and they click "got it" then send the route to the backend
  // to turn starred to 0


 return <div className='box'>
  <h2 className="title is-2">{deck_title}</h2>
  {/* {function(){
    if (studyDeck[index].studyAgain) {
      return <>Studying Again</>
    }
  }()} */}
   {function(){
    if (starred === 1) {
      return <>This question was challenging for you, try to get it this time!</>
    }
  }()}
 <nav className="nav">
   <div className='left'>
       </div>
   <div className="right">
     <div className="tags are-large">
     </div>
   </div>
 </nav>
<div className="flip-container" onClick={flipCard}>
     <div className={`flip-card${isFlipped ? ' is-flipped' : ''}`}>
       <div className="flip-card-inner">
         <div className="flip-card-front">
           <h3 className="title is-3">{term}</h3>
         </div>
         <div className="flip-card-back">
           <p>{definition}</p>
         </div>
       </div>
     </div>
   </div>
   <div className='buttons'>
      <button name="skip-back" type="button" onClick={handleClick}>Skip Back</button>
      <button name="skip-forward" type="button" onClick={handleClick}>Skip Forward</button>
      <button name="study-again" type="button" onClick={handleClick}>Study again</button>
      <button name="got-it" type="button" onClick={handleClick}>Got it!</button>
      <button name="done" type="button" onClick={handleClick}>Done</button>
      <button name="shuffle" type="button" onClick={handleClick}>Shuffle</button>
   </div>
</div>
}


//   return (
//     <div className="box">
//       <h2 className="title is-2">Deck Title</h2>
//       <nav className="level">
//         <div className="level-left">
//           <div className="tags are-large">
//             {/* You can change this buttons/tags based on the view */}
//             <span className="tag has-text-light">Flashcards</span>
//             <span className="tag has-text-light">Learn</span>
//             <span className="tag has-text-light">Test</span>
//             <span className="tag has-text-light">Shuffle</span>
//           </div>
//         </div>
//         <div className="level-right">
//           <div className="tags are-large">
//             <span className="tag has-text-light">Edit</span>
//             <span className="tag has-text-light">Settings</span>
//           </div>
//         </div>
//       </nav>
//       <div className="flip-container" onClick={flipCard}>
//         <div className={`flip-card${isFlipped ? ' is-flipped' : ''}`}>
//           <div className="flip-card-inner">
//             <div className="flip-card-front">
//               <h3 className="title is-3">Front Side</h3>
//               <p>This is the front side of the card.</p>
//             </div>
//             <div className="flip-card-back">
//               <h3 className="title is-3">Back Side</h3>
//               <p>This is the back side of the card.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Pagination component for card depending on the view */}
//       <Pagination />
//     </div>
//   );
// };

// export default Flashcard;