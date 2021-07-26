import React, { useEffect, useRef, useState } from 'react';

function Canvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(2);
  const [lastBrush, setLastBrush] = useState('#000000');
  const [drawingPos, setDrawingPos] = useState([]);
  let [posIndex, setPosIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, []);

  const start = event => {
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
    event.preventDefault();
  };

  const draw = event => {
    if (isDrawing) {
      contextRef.current.lineTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
      contextRef.current.lineCap = 'round';
      contextRef.current.lineJoin = 'round';
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushWidth;
      contextRef.current.stroke();
    }
    event.preventDefault();
  };

  const stop = event => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
      setDrawingPos(drawingPos => [...drawingPos, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      setPosIndex(posIndex += 1);
    }
    event.preventDefault();
  };

  const mouseOutStop = event => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
    }
    event.preventDefault();
  };

  const colorPicker = event => {
    setBrushColor(event.target.value);
    setLastBrush(event.target.value);
  };

  const widthPicker = event => {
    setBrushWidth(event.target.value);
  };

  const pickEraser = event => {
    setBrushColor('#ffffff');
  };

  const pickBrush = event => {
    setBrushColor(lastBrush);
  };

  const clearCanvas = event => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawingPos([]);
    setPosIndex(-1);
  };

  const undoStroke = event => {
    if (posIndex <= 0) {
      clearCanvas();
    } else {
      setPosIndex(posIndex -= 1);
      setDrawingPos(drawingPos.slice(0, -1));
      contextRef.current.putImageData(drawingPos[posIndex], 0, 0);
    }
  };

  return (
    <div className="container">
      <canvas
      ref={canvasRef}
      onMouseDown={start}
      onMouseMove={draw}
      onMouseUp={stop}
      onMouseOut={mouseOutStop}
      onTouchStart={start}
      onTouchMove={draw}
      onTouchEnd={stop}
      width="500"
      height="500">
      </canvas>
      <div className="navBar">
        <i type="button" onClick={pickBrush} id="brush" name="brush" value="brush" className="fas fa-paint-brush fa-2x iconWhite"></i>
        <i type="button" onClick={pickEraser} id="eraser" name="eraser" value="eraser" className="fas fa-eraser fa-2x iconPink"></i>
        <i type="button" onClick={undoStroke} id="undoStroke" name="undoStroke" value="Undo" className="fas fa-undo fa-2x iconRed"></i>
        <i type="button" onClick={clearCanvas} id="clearCanvas" name="clearCanvas" value="Clear" className="fas fa-times fa-2x iconRed"></i>
        <input onChange={colorPicker} type="color" id="colorPicker" name="colorPicker"></input>
        <label htmlFor="widthPicker">Width:</label>
        <input onChange={widthPicker} type="range" id="widthPicker" name="widthPicker" min="1" max="50" value={brushWidth} className="widthPicker"></input>
      </div>
    </div>
  );
}

export default Canvas;
