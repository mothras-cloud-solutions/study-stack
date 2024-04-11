import React, { useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import Rectangle from './studyShapes/Rectangle.tsx';
import Circle from './studyShapes/Circle.tsx';
import Line from './studyShapes/Line.tsx';
import Text from './studyShapes/Text.tsx';

interface Props {
  front: string;
  back: string;
  flipped: boolean;
  index: number;
};

const StudyCanvas: React.FC<Props> = ({ front, back, flipped, index }) => {
  const [shapes, setShapes] = useState({"rectangles":[],"circles":[],"lines":[],"texts":[],"number":0});

  let baseWidth = 1304;
  let baseHeight = 398;

  const [parentDimensions, setParentDimensions] = useState({width: baseWidth, height: baseHeight});
  const [scaleW, setScaleW] = useState(1);
  const [scaleH, setScaleH] = useState(1);

  useEffect(() => {
    function updateParentDimensions() {
      const parentDiv = document.getElementById('studyCanvas');
      if (parentDiv) {
        let { clientWidth, clientHeight } = parentDiv;
        setParentDimensions({width: clientWidth, height: clientHeight});
      }
    };

    window.addEventListener('resize', updateParentDimensions);
    updateParentDimensions();
    return () => {
      window.removeEventListener('resize', updateParentDimensions);
    };
  },[]);

  useEffect(() => {
    setScaleW(parentDimensions.width / baseWidth);
    setScaleH(parentDimensions.height / baseHeight);
  }, [parentDimensions]);

  useEffect(() => {
    if (flipped && back.length > 1) {
      setShapes(JSON.parse(back))
    } else if (flipped && back.length < 5) {
      setShapes({"rectangles":[],"circles":[],"lines":[],"texts":[],"number":0})
    }
    if (!flipped && front.length > 0) {
      setShapes(JSON.parse(front));
    } else if (!flipped && front.length < 5) {
      setShapes({"rectangles":[],"circles":[],"lines":[],"texts":[],"number":0});
    }
  }, [flipped, index]);

  return (
    <Stage width={baseWidth * scaleW} height={baseHeight * scaleH}>
      <Layer>
        {(shapes.rectangles && shapes.rectangles.length > 0) && shapes.rectangles.map((rect) => {
          return (<Rectangle shapeSpecs={rect}/>)
        })}
        {(shapes.circles && shapes.circles.length > 0) && shapes.circles.map((circ) => {
          return (<Circle shapeSpecs={circ}/>)
        })}
        {(shapes.lines && shapes.lines.length > 0) && shapes.lines.map((lin) => {
          return (<Line shapeSpecs={lin}/>)
        })}
        {(shapes.texts && shapes.texts.length > 0) && shapes.texts.map((tex) => {
          return (<Text textSpecs={tex}/>)
        })}
      </Layer>
    </Stage>
  )
};

export default StudyCanvas;

// interface rectangles {
//   x?: number;
//   y?: number;
//   width?: number;
//   height?: number;
//   fill?: string;
//   strokeWidth?: number;
//   stroke?: string;
//   id?: string;
// }[];

// interface circles {
//   x?: number;
//   y?: number;
//   width?: number;
//   height?: number;
//   fill?: string;
//   strokeWidth?: number;
//   stroke?: string;
//   id?: string;
// }[];

// interface lines {
//   points?: Array;
//   stroke?: string;
//   strokeWidth?: number;
//   fill?: string;
//   id?: string;
// }[];

// interface texts {
//   x?: number;
//   y?: number;
//   fill?: string;
//   align?: string;
//   text?: string;
//   id?: string;
// }[];