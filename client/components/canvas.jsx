import React, { useEffect, useRef, useState } from 'react';

function Canvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

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
      contextRef.current.strokeStyle = '#000000';
      contextRef.current.lineWidth = 2;
      contextRef.current.stroke();
    }
    event.preventDefault();
  };

  const stop = event => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
    }
    event.preventDefault();
  };

  return (
    <div className="container">
      <canvas
      ref={canvasRef}
      onMouseDown={start}
      onMouseMove={draw}
      onMouseUp={stop}
      onTouchStart={start}
      onTouchMove={draw}
      onTouchEnd={stop}
      width="500"
      height="500">
      </canvas>
      <div className="navBar">
        <i type="button" id="brush" name="brush" value="brush" className="fas fa-paint-brush iconWhite"></i>
        <i type="button" id="eraser" name="eraser" value="eraser" className="fas fa-eraser iconPink"></i>
        <i type="button" id="undoStroke" name="undoStroke" value="Undo" className="fas fa-undo iconRed"></i>
        <i type="button" id="clearCanvas" name="clearCanvas" value="Clear" className="fas fa-times iconRed"></i>
        <input type="color" id="colorPicker" name="colorPicker" value="#000000"></input>
        <label htmlFor="widthPicker">Width:</label>
        <input type="range" id="widthPicker" name="widthPicker" min="1" max="50" value="2" className="widthPicker"></input>
      </div>
    </div>
  );
}

export default Canvas;
