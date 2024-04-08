import React, { useState } from 'react';

// const Card: React.FC<{term: string,
//   definition: string,
//  keywords:string,
// confidenceLevel: number}>
export default function Card ({card, setIndex, index}) {

  console.log(card, " this is the card in card")

  let {term, definition, keywords, confidenceLevel} = card;
  console.log(term, " this is term now!" )

  // Build confidence increasing functionality later

  // need these buttons - Skip Forward, Skip Back, Got it :saluting_face:, Repeat, and Done.

  function handleClick(e) {
    e.preventDefault();
    let buttonClicked = e.target.innerText
    console.log(buttonClicked, " this is buttonClicked!!")

    if (buttonClicked === "Skip Back"){
      console.log("This is where we skip back")
    } else if (buttonClicked === "Skip Forward"){
      console.log("This is where we skip forward")
      let newIndex = index + 1;
      setIndex(newIndex)
      console.log(index, " is the index now in the card")
    } else if (buttonClicked === "Study again") {
      console.log("This is where we study again")
    } else if (buttonClicked === "Got it!") {
      console.log("This is where we got it")
    } else if (buttonClicked === "Done") {
      console.log("This is where we done")
    }
    return
  }

 return <div className='card-box'>
  <h2>Card Title</h2>
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