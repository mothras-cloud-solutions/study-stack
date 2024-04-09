import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Stage, Layer } from 'react-konva';
import Rectangle from './shapes/Reactangle';
import Circle from './shapes/Circle.tsx';
import Line from './shapes/Line.tsx';
import Text from './shapes/Text.tsx';


export default function Canvas () {
  const [selectId, selectElement] = useState('');
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [texts, setTexts] = useState([]);
  const [textField, setTextField] = useState('');
  const [numberOfShapes, setNumberOfShapes] = useState(0);
  const [shapes, setShapes] = useState({rectangles: [], circles: [], lines: [], texts: [], number: 0});

  const stageRef = useRef();

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectElement('');
    }
  };
  const onSave = () => {
    let canvas = JSON.stringify(shapes);
  };
  const onTextInput = (e) => {
    setTextField(e.target.value);
  };
  const onDelete = () => {
    if (selectId !== '') {
      if (selectId.substring(0,1) === 'r') {
        for (var i = 0; i < rectangles.length; i++) {
          if (rectangles[i].id === selectId) {
            let newRectangles = rectangles.slice(0, i).concat(rectangles.slice(i+1));
            setRectangles(newRectangles);
          }
        }
      } else if (selectId.substring(0,1) === 'l') {
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].id === selectId) {
            let newLines = lines.slice(0, i).concat(lines.slice(i+1));
            setLines(newLines);
          }
        }
      } else if (selectId.substring(0,1) === 'c') {
        for (var i = 0; i < circles.length; i++) {
          if (circles[i].id === selectId) {
            let newCircles = circles.slice(0, i).concat(circles.slice(i+1));
            setCircles(newCircles);
          }
        }
      } else if (selectId.substring(0,1) === 't') {
        for (var i = 0; i < texts.length; i++) {
          if (texts[i].id === selectId) {
            let newTexts = texts.slice(0, i).concat(texts.slice(i+1));
            setTexts(newTexts);
          }
        }
      }
    }
  };

  useEffect(() => {
    // let saveFile = '{"rectangles":[{"x":98,"y":101,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect2"},{"x":83,"y":132,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect3"}],"circles":[{"x":265,"y":222,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ1"},{"x":124,"y":153,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ4"}],"lines":[{"points":[175.00000000000006,50,437.50000000000017,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line5","x":132,"y":93}],"number":5}'
    // setShapes(JSON.parse(saveFile));
  }, []);

  useEffect(() => {
    setRectangles(shapes.rectangles);
    setCircles(shapes.circles);
    setLines(shapes.lines);
  }, [shapes])

  useEffect(() => {
    let shapeNumber = rectangles.length + circles.length + lines.length + texts.length;
    setNumberOfShapes(shapeNumber);
  }, [rectangles, circles, lines, texts])

  const addRectangle = () => {
    if (numberOfShapes < 50) {
      const rect = {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'rgba(0,0,0,0.01)',
        strokeWidth: 1,
        stroke: 'black',
        id: `rect${shapes.number+1}`
      }
      const rects = rectangles.concat([rect]);
      setRectangles(rects);
      shapes.rectangles = rects;
      shapes.number ++;
    }
  };

  const addCircle = () => {
    if (numberOfShapes < 50) {
      const circ = {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: 'rgba(0,0,0,0.01)',
        strokeWidth: 1,
        stroke: 'black',
        id: `circ${shapes.number+1}`
      }
      const circs = circles.concat([circ]);
      setCircles(circs);
      shapes.circles = circs;
      shapes.number ++;
    }
  };

  const addLine = () => {
    if (numberOfShapes < 50) {
      const line = {
        points: [50, 50, 125, 50],
        stroke: 'black',
        strokeWidth: 5,
        fill: 'black',
        id: `line${shapes.number+1}`
      }
      const newLines = lines.concat([line]);
      setLines(newLines);
      shapes.lines = newLines;
      shapes.number ++;
    }
  };

  const addText = () => {
    if (numberOfShapes < 50) {
      const newText = {
        x: 50,
        y: 50,
        fill: 'black',
        align: 'center',
        text: `${textField}`,
        id: `text${shapes.number+1}`
      }
      const newTexts = texts.concat([newText]);
      setTexts(newTexts);
      shapes.texts = newTexts;
      shapes.number ++;
    }
  };

  return (
    <Fragment>
      <div style={{zIndex: 50, position: 'absolute'}}>
        <button onClick={addRectangle}>Rectangles</button>
        <button onClick={addCircle}>Circles</button>
        <button onClick={addLine}>Lines</button>
        <button onClick={onSave}>Save</button>
        <button onClick={onDelete}>Delete</button>
        <label for='text'>Text</label>
        <input type='text' name="text" onChange={onTextInput}></input>
        <button onClick={addText}>CreateText</button>
      </div>
      <Stage ref={stageRef} width={500} style={{zIndex: 50}} height={500} onClick={checkDeselect} onTouchStart={checkDeselect}>
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
                  setRectangles(rects);
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
                  setCircles(circs);
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
                setLines(newLine);
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
                  setTexts(otherTexts);
                  shapes.texts = otherTexts;
                }}
              />
            )
          })}
        </Layer>
      </Stage>
    </Fragment>
  )
}