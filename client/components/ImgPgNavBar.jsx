import React from 'react';

function ImgPgNavBar(props) {

  const deleteImg = () => {
    event.preventDefault();
    fetch(`/api/drawings/${props.drawingId}`, {
      method: 'DELETE'
    })
      .catch(err => console.error(err));
    window.location.hash = '#userGallery';
  };

  return (
    <>
      <a type="button" onClick={deleteImg()} id="delete" title="Delete your picture" className="fas fa-trash-alt fa-2x icon-black"></a>
    </>
  );
}

export default ImgPgNavBar;
