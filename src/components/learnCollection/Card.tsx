import React, { useState } from 'react';

// const Card: React.FC<{term: string,
//   definition: string,
//  keywords:string,
// confidenceLevel: number}>
export default function Card ({card, setIndex}) {

  console.log(card, " this is the card in card")

  let {term, definition, keywords, confidenceLevel} = card;
  console.log(term, " this is term now!" )

  // Build confidence increasing functionality later

  // need these buttons - Skip Forward, Skip Back, Got it :saluting_face:, Repeat, and Done.

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
</div>
}