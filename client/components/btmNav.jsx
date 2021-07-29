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
      <i type="button" onClick={this.handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x iconPink userMenu"></i>
      <div id="menu" name="menu" className={this.hidden()}>
        {/* <a id="saveImg">Save Image</a> */}
        <a id="gallery" href="#userGallery">Gallery</a>
        <a id="myImgs">My Images</a>
        <a id="canvasPg" href="">Canvas</a>
      </div>
    </div>
    );
  }
}
