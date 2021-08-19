import React, { useState, useEffect } from 'react';

function ImgPg(props) {
  const [drawing, setDrawing] = useState(null);

  // const deleteImg = () => {
  //   event.preventDefault();
  //   fetch(`/api/drawings/${props.drawingId}`, {
  //     method: 'DELETE'
  //   })
  //     .catch(err => console.error(err));
  //   window.location.hash = '#userGallery';
  // };

  useEffect(() => {
    fetch(`/api/drawingURL/${props.drawingId}`)
      .then(res => res.json())
      .then(data => setDrawing(data[0].drawing))
      .catch(err => console.error(err));
  }, []);

  // const handleClick = () => {
  //   deleteImg();
  //   window.location.hash = '#userGallery';
  // };

  // const drawingURL = drawing[0].drawing;
  return (
      <div className="col">
        <img src={drawing} className="img-pg-img"></img>
        <div className="mini-nav">
          <a type="button" href={drawing} download title="Download your picture" className="fas fa-download fa-2x icon-green"></a>
          {/* <a type="button" id="delete" title="Delete your picture" className="fas fa-trash-alt fa-2x icon-black"></a> */}
        </div>
      </div>
  );
}

export default ImgPg;
