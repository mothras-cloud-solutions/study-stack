import React, { useRef, useEffect, Fragment } from 'react';
import { Stage, Layer, Line, Transformer } from 'react-konva';

interface shapeSpecs {
  points?: Array;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  id?: string;
};

interface Props {
  shapeSpecs: ShapeSpecs;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newSpecs: ShapeSpecs) => void;
};

const LineMaker: React.FC<Props> = ({ shapeSpecs, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

   useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  });

  return (
    <Fragment>
      <Line
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
          const rotation = node.rotation();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          const points = node.points().map((point, index) => {
            // Scale each coordinate
            if (index % 2 === 0) {
              // X coordinate
              return Math.max(5, point * scaleX);
            } else {
              // Y coordinate
              return point * scaleY;
            }
          });
          onChange({
            ...shapeSpecs,
            points: points,
            rotation: rotation,
            // x: node.x(),
            // y: node.y(),
            // // set minimal value
            // width: Math.max(5, node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={true}
          enabledAnchors={['middle-right', 'middle-left']}
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

export default LineMaker;