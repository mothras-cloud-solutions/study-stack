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
          ...shapeSpecs,
          x: e.target.x(),
          y: e.target.y(),
        }}
      />
      {isSelected && <Transformer />}
    </Fragment>
  )
}


export default Rectangle;

