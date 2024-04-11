import React from 'react';
import { Line } from 'react-konva';

interface shapeSpecs {
  points?: Array;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  id?: string;
};

interface Props {
  shapeSpecs: shapeSpecs;
}

const LineMaker: React.FC<Props> = ({ shapeSpecs }) => {
  return (
    <Line {...shapeSpecs}/>
  )
};

export default LineMaker;