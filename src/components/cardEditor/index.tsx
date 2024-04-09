//NOT CURRENTLY USING THIS FILE TEMPORARILY UNTIL SOLUTION FOR BUTTONS ARE FOUND
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Card from '../Card.tsx';
// import Canvas from './Canvas.tsx';


const CardEditor: React.FC<{card: object, previousCanvas: string}> = ({ card, previousCanvas}) => {
  //Edit cards with annotations
  //Buttons are placeholders for state
  function addRect() {
  };
  function addCircle() {
  };
  function addLine() {
  };

  return (
    <div>
      <button onClick={addRect}>Rectangle</button>
      <button onClick={addCircle}>Circle</button>
      <button onClick={addLine}>Line</button>
      {/* <Card />
      <Canvas /> */}
    </div>
  )
}
 export default CardEditor;