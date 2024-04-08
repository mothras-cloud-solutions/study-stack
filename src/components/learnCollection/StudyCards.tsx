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


// make a state that equals [0]

// return <CardDisplayComponent card={collection[state]} setState={setState} >
// in that <CardDisplayComponent> the buttons will handle updating the confidence rating for the current card
// it will also increment setState by 1, which should switch to the next card
// have logic here where if "state" exceeds the length of collection, then stop studying and display something else like
// "You're done!"

let length = prop.prop.length


  return <div>
    <Card card={prop.prop[index]} setIndex={setIndex} index={index} length={length}/>
  </div>
}

