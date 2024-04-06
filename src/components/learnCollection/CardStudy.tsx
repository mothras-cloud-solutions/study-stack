import React, { useState } from 'react';

export default function Card ( {card} ) {

  return <div className='card-box'>
   <h2>Card Title</h2>
  <nav className="nav">
    <div className='left'>
        <span className="tag">Flashcards</span>
        <span className="tag">Learn</span>
        <span className="tag">Test</span>
        <span className="tag">Shuffle</span>
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
}