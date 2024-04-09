import React, { useState } from 'react';
import Card from './Card.tsx';
import {collection} from './Interfaces.tsx';

// three levels are needed
// the card itself with the buttons etc.
// the logic on top of the cards where the collection can be incremented
// to display each card individually

// Then for my purposes I need a test caller to call the study page with
// a collection of dummy data



export default function StudyCards (prop: collection) {

  const [index, setIndex] = useState(0);

  const currDeck = prop.prop.filter((card) => {
    return card.archived !== 1;
  })

  const [studyDeck, setStudyDeck] = useState(currDeck);

  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function shuffleTheDeck() {
  let shuffleDeck = studyDeck.slice();
      shuffleDeck = shuffle(shuffleDeck);
      console.log(shuffleDeck, " this is shuffledeck")
      setStudyDeck(shuffleDeck);
      setIndex(0);
}


// make a state that equals [0]

// return <CardDisplayComponent card={collection[state]} setState={setState} >
// in that <CardDisplayComponent> the buttons will handle updating the confidence rating for the current card
// it will also increment setState by 1, which should switch to the next card
// have logic here where if "state" exceeds the length of collection, then stop studying and display something else like
// "You're done!"

const length = studyDeck.length

// pass down the deck itself and the ability to edit the deck so that a card can
// dynamically have a new property added to it to allow it to be shown again

  return <div> {function(){
    if (studyDeck) {
      return <Card card={studyDeck[index]} setIndex={setIndex} index={index} length={length}
      studyDeck={studyDeck} setStudyDeck={setStudyDeck} shuffleTheDeck={shuffleTheDeck}/>
    }
    }()}
  </div>
}

