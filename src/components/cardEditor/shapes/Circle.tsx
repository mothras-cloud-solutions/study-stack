import React, { useRef, useEffect, Fragment } from 'react';
import { Stage, Layer, Circle, Transformer } from 'react-konva';

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
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newSpecs: ShapeSpecs) => void;
};

const CircleMaker: React.FC<Props> = ({ shapeSpecs, isSelected, onSelect, onChange }) => {

  const shapeRef = useRef<Node>();
  const trRef = useRef<Transformer>();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  })

  return (
    <Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeSpecs}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeSpecs,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeSpecs,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  )
};

export default CircleMaker;