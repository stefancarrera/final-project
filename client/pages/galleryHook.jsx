import React, { useState, useEffect } from 'react';

function Gallery() {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    fetch('/api/userDrawingsURL')
      .then(response => response.json())
      .then(data => setDrawings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="col header-two">
        <h1 className="header-two-h1">Welcome to the Gallery</h1>
        <h2>Here you can see all the saved drawings!</h2>
      </div>
      <div>
        <div className="row">
          {
            drawings.map(drawings => (
              <div key={drawings.drawingId} className="col">
                <a href={`#drawings?drawingId=${drawings.drawingId}`}>
                  <img src={drawings.drawing}></img>
                </a>
              </div>))
          }
        </div>
      </div>
    </>
  );
}

export default Gallery;
