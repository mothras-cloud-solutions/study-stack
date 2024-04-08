import React, { useRef, useEffect, Fragment } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

// const Rectangle: React.FC<{ isSelected: Function, onSelect: Function, onChange: Function }> = ({ isSelected, onSelect, onChange }) => {
//   const shapeRef = useRef();
//   const trRef = useRef();

//   //Is selected is an unmade state tracking current layer/ item clicked
//   //Creates the 'expander' around shapes
  // useEffect(() => {
  //   if (isSelected) {
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // })
//   return (
//     <Fragment>
//       <Rect
//         onClick={onSelect}
//         onTap={onSelect}
//         ref={shapeRef}
//       />
//       {isSelected && <Transformer />}
//     </Fragment>
//   )
// }
const Rectangle = ({ shapeSpecs, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

   useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  })

  return (
    <Fragment>
      <Rect
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
            ...shapeProps,
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
  );
};


export default Rectangle;

