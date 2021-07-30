import React from 'react';

export default class ImgPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/drawingURL/${this.props.drawingId}`)
      .then(res => res.json())
      .then(drawing => this.setState({ drawing }))
      .catch(err => console.error(err));
  }

  handleClick() {
    this.deleteImg();
    window.location.hash = '#userGallery';
  }

  deleteImg() {
    fetch(`/api/drawings/${this.props.drawingId}`, {
      method: 'DELETE'
    })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.drawing) return null;
    const drawing = this.state.drawing[0].drawing;
    return (
      <div className="col">
        <img onClick={this.handleClick} src={drawing.slice(14)} className="imgPgImg"></img>
        <div className="miniNav">
          <a type="button" href={drawing.slice(14)} download title="Download your picture" className="fas fa-download fa-2x iconGreen"></a>
          <a type="button" onClick={this.handleClick} id="delete" title="Delete your picture" className="fas fa-trash-alt fa-2x iconBlack"></a>
        </div>
      </div>
    );
  }
}
