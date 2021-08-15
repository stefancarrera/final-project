import React, { useState } from 'react';

function BtmNav() {
  const [isClikced, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClikced) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  const hidden = () => {
    if (!isClikced) {
      return 'menu-row hidden';
    } else {
      return 'menu-row';
    }
  };

  return (
    <div className="nav-bar user-g">
      <a type="button" onClick={handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x icon-black user-menu"></a>
      <div className={hidden()}>
        <div id="menu" name="menu" className="menu">
          <a id="myImgs" href="#userGallery">Gallery</a>
          <a id="canvasPg" href="">New Canvas</a>
        </div>
      </div>
    </div>
  );
}

export default BtmNav;
