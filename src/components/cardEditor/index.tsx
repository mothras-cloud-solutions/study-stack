import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewCanvas from './NewCanvas.tsx';

const CardEditor: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectId, selectElement] = useState('');
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [texts, setTexts] = useState([]);
  const [textField, setTextField] = useState('');
  const [showText, setShowText] = useState(false);
  const [numberOfShapes, setNumberOfShapes] = useState(0);
  const [shapes, setShapes] = useState({rectangles: [], circles: [], lines: [], texts: [], number: 0});
  const [frontShapes, setFront] = useState({rectangles: [], circles: [], lines: [], texts: [], number: 0});
  const [backShapes, setBack] = useState({rectangles: [], circles: [], lines: [], texts: [], number: 0});

  // Function to flip the card on click
  const flipCard = () => {
    if (!isFlipped) {
      setFront(shapes);
      setShapes(backShapes);
    } else if (isFlipped) {
      setBack(shapes);
      setShapes(frontShapes);
    }
    setIsFlipped(!isFlipped);
  };
  // Deselect Object
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectElement('');
    }
  };
  // Save Canvas
  const onSave = () => {
    let front;
    let back;
    if (isFlipped) {
      back = shapes;
      front = frontShapes;
    } else {
      back = backShapes;
      front = shapes;
    }
    let frontCanvas = JSON.stringify(front);
    let backCanvas = JSON.stringify(back);
    console.log(frontCanvas, backCanvas);
  };
  //Change Text field
  const onTextInput = (e) => {
    setTextField(e.target.value);
  };
  // Delete selected object
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
  //Reset Canvas
  function resetCanvas() {
    setShapes({rectangles: [], circles: [], lines: [], texts: [], number: 0});
  };

  //Load saved canvas
  useEffect(() => {
    setRectangles(shapes.rectangles);
    setCircles(shapes.circles);
    setLines(shapes.lines);
    setTexts(shapes.texts);
  }, [shapes]);

  // Sets limit on # of objects
  useEffect(() => {
    let shapeNumber = rectangles.length + circles.length + lines.length + texts.length;
    setNumberOfShapes(shapeNumber);
  }, [rectangles, circles, lines, texts]);

  //Add Shape functions
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
    if (showText && textField.length > 0) {
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
    }
    setShowText(!showText);
  };

  //Set state functions to pass down
  function select(id: string) {
    console.log(id);
    selectElement(id);
  };
  function r(rects: Array) {
    setRectangles(rects);
  };
  function c(circs: Array) {
    setCircles(circs);
  };
  function l(newLine: Array) {
    setLines(newLine);
  };
  function t(otherTexts: Array) {
    setTexts(otherTexts);
  };
  const style = {
    zIndex: 50,
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  return (
    <div className="box">
      <h2 className="title is-2">Edit Card</h2>
      <nav className="level">
        <div className="level-left">
          <div className="tags are-large">
            {/* You can change, edit, add, and delete this buttons/tags based on the view */}
            <span className="tag" onClick={addRectangle}>Rectangle</span>
            <span className="tag" onClick={addCircle}>Circle</span>
            <span className="tag" onClick={addLine}>Line</span>
            {!showText && <span className="tag" onClick={addText}> Create Text</span>}
            {showText && <span className="tag" onClick={addText}>Add Text</span>}
            {showText && <input type='text' maxLength={50} onChange={onTextInput}></input>}
          </div>
        </div>
        <div className="level-right">
          <div className="tags are-large">
            <span className="tag" onClick={onSave}>Save</span>
            <span className="tag" onClick={resetCanvas}>Reset</span>
            <span className="tag" onClick={onDelete}>Delete</span>
            <span className="tag" onClick={flipCard}>Flip Card</span>
          </div>
        </div>
      </nav>
      <div className="flip-container" id="editorCanvas">
        <div className='flip-card' style={style}>
            <NewCanvas click={checkDeselect} rectangles={rectangles} circles={circles} lines={lines} texts={texts} shapes={shapes} selectId={selectId} selectElement={select} setR={r} setC={c} setL={l} setT={t}/>
        </div>
        <div className={`flip-card${isFlipped ? ' is-flipped' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3 className="title is-3">Front Side</h3>
              <p>This is the front side of the card.</p>
            </div>
            <div className="flip-card-back">
              <h3 className="title is-3">Back Side</h3>
              <p>This is the back side of the card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;