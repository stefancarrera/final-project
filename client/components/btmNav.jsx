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
      return 'menu-row hidden';
    } else {
      return 'menu-row';
    }
  }

  render() {
    return (
      <div className="nav-bar user-g">
      <a type="button" onClick={this.handleClick} id="menuBtn" name="menuBtn" className="fas fa-bars fa-2x icon-black user-menu"></a>
      <div className={this.hidden()}>
        <div id="menu" name="menu" className="menu">
          <a id="myImgs" href="#userGallery">Gallery</a>
          <a id="canvasPg" href="">New Canvas</a>
        </div>
      </div>
    </div>
    );
  }
}
