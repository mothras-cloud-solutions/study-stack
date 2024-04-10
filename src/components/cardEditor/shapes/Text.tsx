import React, { useRef, useEffect, Fragment } from 'react';
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
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newSpecs: ShapeSpecs) => void;
};

const TextMaker: React.FC<Props> = ({ textSpecs, isSelected, onSelect, onChange }) => {
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
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...textSpecs}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...textSpecs,
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
            ...textSpecs,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            fontSize: Math.max(5, node.fontSize() * Math.max(scaleX, scaleY)),
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

export default TextMaker;