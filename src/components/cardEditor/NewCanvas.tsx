import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Rectangle from './shapes/Reactangle';
import Circle from './shapes/Circle.tsx';
import Line from './shapes/Line.tsx';
import Text from './shapes/Text.tsx';

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
  shapes: object;
  selectId: string;
  click: () => void;
  selectElement: (id: string) => void;
  setR: (id: string) => void;
  setC: (id: string) => void;
  setL: (id: string) => void;
  setT: (id: string) => void;
}

const NewCanvas: React.FC<Props> = ({ rectangles, circles, lines, texts, shapes, selectId, click, selectElement, setR, setC, setL, setT }) => {
  let baseWidth = 1304;
  let baseHeight = 400;

  const [parentDimensions, setParentDimensions] = useState({width: baseWidth, height: baseHeight});
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateParentDimensions() {
      const parentDiv = document.getElementById('editorCanvas');
      if (parentDiv) {
        let { clientWidth, clientHeight } = parentDiv;
        setParentDimensions({width: clientWidth, height: clientHeight});
      }
    };

    window.addEventListener('resize', updateParentDimensions);
    updateParentDimensions();
    return () => {
      window.removeEventListener('resize', updateParentDimensions);
    };
  },[]);

  useEffect(() => {
    const scaleX = parentDimensions.width / baseWidth;
    const scaleY = parentDimensions.height / baseHeight;
    const minScale = Math.min(scaleX, scaleY);
    setScale(minScale);
  }, [parentDimensions]);

  return (
    <Stage onClick={click} width={baseWidth * scale} height={baseHeight * scale}>
      <Layer>
        {rectangles.length > 0 && rectangles.map((rect, i) => {
          return (
            <Rectangle
              shapeSpecs={rect}
              isSelected={rect.id === selectId}
              onSelect={() => {
                selectElement(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setR(rects);
                shapes.rectangles = rects;
              }}
            />
          )
        })}
        {circles.length > 0 && circles.map((circ, i) => {
          return (
            <Circle
              shapeSpecs={circ}
              isSelected={circ.id === selectId}
              onSelect={() => {
                selectElement(circ.id);
              }}
              onChange={(newAttrs) => {
                const circs = circles.slice();
                circs[i] = newAttrs;
                setC(circs);
                shapes.circles = circs;
              }}
            />
          )
        })}
        {lines.length > 0 && lines.map((line, i) => {
          return (
            <Line
            shapeSpecs={line}
            isSelected={line.id === selectId}
            onSelect={() => {
              selectElement(line.id);
            }}
            onChange={(newAttrs) => {
              const newLine = lines.slice();
              newLine[i] = newAttrs;
              setL(newLine);
              shapes.lines = newLine;
            }}
            />
          )
        })
        }
        {texts.length > 0 && texts.map((tex, i) => {
          return (
            <Text
              textSpecs={tex}
              isSelected={tex.id === selectId}
              onSelect={() => {
                selectElement(tex.id);
              }}
              onChange={(newAttrs) => {
                const otherTexts = texts.slice();
                otherTexts[i] = newAttrs;
                setT(otherTexts);
                shapes.texts = otherTexts;
              }}
            />
          )
        })}
      </Layer>
    </Stage>
  )
};

export default NewCanvas;