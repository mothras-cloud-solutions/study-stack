import React from 'react';
import { Rect } from 'react-konva';

interface ShapeSpecs {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  id?: string;
};

interface Props {
  shapeSpecs: ShapeSpecs;
};

const RectangleMaker: React.FC<Props> = ({ shapeSpecs }) => {
  return (
    <Rect {...shapeSpecs}/>
  )
};

export default RectangleMaker;