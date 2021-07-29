import React from 'react';

export default class GlbImgPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: null
    };
  }

  componentDidMount() {
    fetch(`/api/drawingURL/${this.props.drawingId}`)
      .then(res => res.json())
      .then(drawing => this.setState({ drawing }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.drawing) return null;
    const drawing = this.state.drawing[0].drawing;
    return (
      <div className="col">
        <img onClick={this.handleClick} src={drawing.slice(14)} className="imgPgImg"></img>
        <div className="miniNav">
        </div>
      </div>
    );
  }
}
