import React from 'react';
import { Stage, Layer } from 'react-konva';
import Rectangle from './studyShapes/Rectangle.tsx';
import Circle from './studyShapes/Circle.tsx';
import Line from './studyShapes/Line.tsx';
import Text from './studyShapes/Text.tsx';

interface rectangles {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  id?: string;
}[];

interface circles {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  id?: string;
}[];

interface lines {
  points?: Array;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  id?: string;
}[];

interface texts {
  x?: number;
  y?: number;
  fill?: string;
  align?: string;
  text?: string;
  id?: string;
}[];

interface Props {
  rectangles: rectangles;
  circles: circles;
  lines: lines;
  texts: texts;
};

const StudyCanvas: React.FC<Props> = ({ rectangles, circles, lines, texts }) => {
  return (
    <Stage>
      <Layer>
        {rectangles.length > 0 && rectangles.map((rect) => {
          return (<Rectangle shapeSpecs={rect}/>)
        })}
        {circles.length > 0 && circles.map((rect) => {
          return (<Circle shapeSpecs={rect}/>)
        })}
        {lines.length > 0 && lines.map((rect) => {
          return (<Line shapeSpecs={rect}/>)
        })}
        {texts.length > 0 && texts.map((rect) => {
          return (<Text shapeSpecs={rect}/>)
        })}
      </Layer>
    </Stage>
  )
};

export default StudyCanvas;