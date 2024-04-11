import React from 'react';
import { Text, Transformer } from 'react-konva';

interface textSpecs {
  x?: number;
  y?: number;
  fill?: string;
  text?: string;
  id?: string;
};

interface Props {
  textSpecs: textSpecs;
};

const TextMaker: React.FC<Props> = ({ textSpecs }) => {
  return (
    <Text {...textSpecs}/>
  )
};

export default TextMaker;