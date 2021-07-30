import React from 'react';

export default class BtmNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isClicked === false) {
      this.setState({ isClicked: true });
    } else {
      this.setState({ isClicked: false });
    }
  }

  hidden() {
    if (this.state.isClicked === false) {
      return 'menu hidden';
    } else {
      return 'menu';
    }
  }

  render() {
    return (
      <div className="navBar userG">
      <i type="button" onClick={this.handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x iconBlack userMenu"></i>
      <div id="menu" name="menu" className={this.hidden()}>
        <a id="globalGallery" href="#globalGallery">Global Gallery</a>
        <a id="myImgs" href="#userGallery">My Images</a>
        <a id="canvasPg" href="">New Canvas</a>
      </div>
    </div>
    );
  }
}
