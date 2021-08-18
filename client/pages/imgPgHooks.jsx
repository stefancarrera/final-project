import React, { useState, useEffect } from 'react';

function ImgPg() {
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    fetch(`/api/drawingURL/${this.props.drawingId}`)
      .then(res => res.json())
      .then(drawing => setDrawing(drawing))
      .catch(err => console.error(err));
  }, []);

  const handleClick = () => {
    deleteImg();
    window.location.hash = '#userGallery';
  };

  const deleteImg = () => {
    fetch(`/api/drawingURL/${this.props.drawingsId}`, {
      method: 'DELETE'
    })
      .catch(err => console.error(err));
  };

  if (!drawing) {
    return null;
  } else {
    const drawingURL = drawing[0].drawing;
    return (
      <div className="col">
        <img onClick={handleClick()} src={drawingURL} className="img-pg-img"></img>
        <div className="mini-nav">
          <a type="button" href={drawingURL} download title="Download your picture" className="fas fa-download fa-2x icon-green"></a>
          <a type="button" onClick={handleClick()} id="delete" title="Delete your picture" className="fas fa-trash-alt fa-2x icon-black"></a>
        </div>
      </div>
    );
  }
}

export default ImgPg;
