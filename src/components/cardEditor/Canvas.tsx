import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Rectangle from './shapes/Reactangle';

export default function Canvas () {
  const [selectId, selectElement] = useState('');
  const [rectangle, setRectangle] = useState({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'grey',
    id: 'rect1',
  });

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectElement('');
    }
  };

  const rectangleProps = {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'grey',
    id: 'rect1',
  }

  return (
    <Stage width={500} height={500} onClick={checkDeselect} onTouchStart={checkDeselect}>
      <Layer>
        <Rectangle
          shapeSpecs={rectangle}
          isSelected={rectangleProps.id === selectId}
          onSelect={() => {
            selectElement(rectangleProps.id);
          }}
          onChange={(newAttrs) => {
            setRectangle(newAttrs);
          }}
        />
      </Layer>

    </Stage>
  )
}