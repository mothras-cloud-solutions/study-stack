import React from 'react';
import { Circle } from 'react-konva';

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

const CircleMaker: React.FC<Props> = ({ shapeSpecs }) => {
  return (
    <Circle {...shapeSpecs}/>
  )
};

export default CircleMaker;