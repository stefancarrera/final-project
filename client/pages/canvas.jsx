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
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, []);

  const start = event => {
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
    // event.preventDefault();
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
    // event.preventDefault();
  };

  const stop = event => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
      setDrawingPos(drawingPos => [...drawingPos, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      setPosIndex(posIndex += 1);
    }
    // event.preventDefault();
  };

  const mouseOutStop = event => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
    }
    // event.preventDefault();
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

  const handleClick = event => {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  const hidden = event => {
    if (!isClicked) {
      return 'menu hidden';
    } else {
      return 'menu';
    }
  };

  const fillBackground = event => {
    contextRef.current.save();
    contextRef.current.globalCompositeOperation = 'destination-over';
    contextRef.current.fillStyle = 'white';
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.restore();
  };

  const saveImg = event => {
    event.preventDefault();
    fillBackground();
    const img = canvasRef.current.toDataURL('image/png');
    const img2 = img.slice(22);
    const imgObj = { imgObj: img2 };
    fetch('/api/saveImg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imgObj)
    })
      .then(response => response.json())
      // eslint-disable-next-line no-console
      .then(data => console.log(data))
      .catch(err => console.error(err));
    clearCanvas();
  };

  return (
    <>
      <canvas
      ref={canvasRef}
      onMouseDown={start}
      onMouseMove={draw}
      onMouseUp={stop}
      onMouseOut={mouseOutStop}
      onTouchStart={start}
      onTouchMove={draw}
      onTouchEnd={stop}
      onPointerDown={start}
      onPointerMove={draw}
      onPointerUp={stop}
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
        <i type="button" onClick={handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x iconWhite"></i>
        <div id="menu" name="menu" className={hidden()}>
          <a id="saveImg" href="" onClick={saveImg}>Save Image</a>
          <a id="globalGallery" href="#globalGallery">Global Gallery</a>
          <a id="myImgs" href="#userGallery">My Images</a>
          <a id="canvasPg" href="">New Canvas</a>
        </div>
      </div>
    </>
  );
}

export default Canvas;
