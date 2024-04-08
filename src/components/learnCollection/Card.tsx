import React, { useState } from 'react';

// const Card: React.FC<{term: string,
//   definition: string,
//  keywords:string,
// confidenceLevel: number}>
export default function Card ({card, setIndex, index, length, studyDeck, setStudyDeck}) {

  let {term, definition, keywords, confidenceLevel} = card;

  // Build confidence increasing functionality later

  // need these buttons - Skip Forward, Skip Back, Got it :saluting_face:, Repeat, and Done.
  // display keywords somewhere

  function handleClick(e) {
    e.preventDefault();
    let buttonClicked = e.target.innerText

    if (buttonClicked === "Skip Back"){
      let newIndex = index - 1;
      if (newIndex < 0){
        console.log("That's far enough")
      } else {
          setIndex(newIndex)
      }
    } else if (buttonClicked === "Skip Forward"){
      let newIndex = index + 1;
      if (newIndex < length){
        setIndex(newIndex)
      } else {
        console.log("No more cards")
      }
    } else if (buttonClicked === "Study again") {
      // add a property to this card object ("StudyAgain : true")
      // then change its position in the array to the length to put it at the end of the arr
      // then delete its current index from the array

      studyDeck[index].studyAgain = true;
      studyDeck[length] = studyDeck[index];
      let newDeck = studyDeck.toSpliced(index, 1)
      setStudyDeck(newDeck);


    } else if (buttonClicked === "Got it!") {
      // increment confidence in the backend route,
      // for now just skip to the next card
      let newIndex = index + 1;
      if (newIndex < length){
        setIndex(newIndex)
      } else {
        console.log("No more cards")
      }
    } else if (buttonClicked === "Done") {
      console.log("Here's where I'll route to another page")
      // needs another page to go to with the react router etc.
      setIndex(0);
    }
    return
  }

 return <div className='card-box'>
  <h2>Deck Title</h2>
  {function(){
    if (studyDeck[index].studyAgain) {
      return <>Studying Again</>
    }
  }()}
 <nav className="nav">
   <div className='left'>
       </div>
   <div className="right">
     <div className="tags are-large">
       <span className="tag">Edit</span>
       <span className="tag">Settings</span>
     </div>
   </div>
 </nav>
<div className="flip-container">
     <div className="flip-card">
       <div className="flip-card-inner">
         <div className="flip-card-front">
           <h3 className="title is-3">Front Side</h3>
           <p>{term}</p>
         </div>
         <div className="flip-card-back">
           <h3 className="title is-3">Back Side</h3>
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
   </div>
</div>
}