import React, { useEffect, useRef, useState } from 'react';

function Canvas() {
  const canvasRef = useRef();
  const contextRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(2);
  const [lastBrush, setLastBrush] = useState('#000000');
  const [drawingPos, setDrawingPos] = useState([]);
  let [posIndex, setPosIndex] = useState(-1);
  const [isClicked, setIsClicked] = useState(false);
  const [canvasSize, setCanvasSize] = useState('500');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    changeCanvasSize();
    window.addEventListener('resize', changeCanvasSize());
  }, []);

  const changeCanvasSize = () => {
    if (window.innerWidth <= 500) {
      setCanvasSize(300);
    } else {
      setCanvasSize(500);
    }
  };

  const start = () => {
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
  };

  const touchStart = () => {
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(event.touches[0].clientX - canvasRef.current.offsetLeft, event.touches[0].clientY - canvasRef.current.offsetTop);
  };

  const draw = () => {
    if (isDrawing) {
      contextRef.current.lineTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
      contextRef.current.lineCap = 'round';
      contextRef.current.lineJoin = 'round';
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushWidth;
      contextRef.current.stroke();
    }
  };

  const touchDraw = () => {
    if (isDrawing) {
      contextRef.current.lineTo(event.touches[0].clientX - canvasRef.current.offsetLeft, event.touches[0].clientY - canvasRef.current.offsetTop);
      contextRef.current.lineCap = 'round';
      contextRef.current.lineJoin = 'round';
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushWidth;
      contextRef.current.stroke();
    }
  };

  const stop = () => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
      setDrawingPos(drawingPos => [...drawingPos, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      setPosIndex(posIndex += 1);
    }
  };

  const mouseOutStop = () => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
      setDrawingPos(drawingPos => [...drawingPos, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      setPosIndex(posIndex += 1);
    }
  };

  const colorPicker = () => {
    setBrushColor(event.target.value);
    setLastBrush(event.target.value);
  };

  const widthPicker = () => {
    setBrushWidth(event.target.value);
  };

  const pickEraser = () => {
    setBrushColor('#ffffff');
  };

  const pickBrush = () => {
    setBrushColor(lastBrush);
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawingPos([]);
    setPosIndex(-1);
  };

  const undoStroke = () => {
    if (posIndex <= 0) {
      clearCanvas();
    } else {
      setPosIndex(posIndex -= 1);
      setDrawingPos(drawingPos.slice(0, -1));
      contextRef.current.putImageData(drawingPos[posIndex], 0, 0);
    }
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  const hidden = () => {
    if (!isClicked) {
      return 'canvas-menu-row hidden';
    } else {
      return 'canvas-menu-row';
    }
  };

  const fillBackground = () => {
    contextRef.current.save();
    contextRef.current.globalCompositeOperation = 'destination-over';
    contextRef.current.fillStyle = 'white';
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.restore();
  };

  const paintBucket = () => {
    contextRef.current.fillStyle = lastBrush;
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawingPos(drawingPos => [...drawingPos, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
    setPosIndex(posIndex += 1);
  };

  const saveImg = () => {
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
      .catch(err => console.error(err));
    clearCanvas();
  };

  return (
    <>
    <div className="canvas-div">
      <canvas
      ref={canvasRef}
      onMouseDown={start}
      onMouseMove={draw}
      onMouseUp={stop}
      onMouseOut={mouseOutStop}
      onTouchStart={touchStart}
      onTouchMove={touchDraw}
      onTouchEnd={stop}
      onPointerDown={start}
      onPointerMove={draw}
      onPointerUp={stop}
      width={canvasSize}
      height={canvasSize}
      >
      </canvas>
    </div>
    <div className="nav-bar">
        <a type="button" onClick={pickBrush} title="Brush Tool" className="fas fa-paint-brush fa-2x icon-green"></a>
        <a type="button" onClick={pickEraser} title="Eraser Tool" className="fas fa-eraser fa-2x icon-pink"></a>
        <a type="button" onClick={paintBucket} title="Paint Bucket Tool" className="fas fa-fill-drip fa-2x icon-black"></a>
        <a type="button" onClick={undoStroke} title="Undo Stroke" className="fas fa-undo fa-2x icon-dark-g"></a>
        <a type="button" onClick={clearCanvas} title="Clear the Canvas" className="fas fa-times fa-2x icon-red"></a>
        <form>
        <label htmlFor="colorPicker">Color Picker:</label>
        <input onChange={colorPicker} type="color" name="colorPicker" title="Color Picker" className="color-picker"></input>
        </form>
        <form>
        <label htmlFor="widthPicker">Tool Width:</label>
        <input onChange={widthPicker} type="range" name="widthPicker" title="Width Picker" min="1" max="50" value={brushWidth} className="width-picker"></input>
        </form>
        <a type="button" onClick={handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x icon-black"></a>
     <div className={hidden()}>
      <div id="menu" name="menu" className="menu">
        <a id="saveImg" href="" onClick={saveImg}>Save Drawing</a>
        <a id="myImgs" href="#userGallery">Gallery</a>
        <a id="canvasPg" href="">New Canvas</a>
     </div>
    </div>
    </div>
    </>
  );
}

export default Canvas;
