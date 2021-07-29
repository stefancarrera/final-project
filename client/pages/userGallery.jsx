import React from 'react';

export default class UserGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: []
    };
  }

  componentDidMount() {
    fetch('api/userDrawingsURL')
      .then(response => response.json())
      .then(data => this.setState({ drawings: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="flex">
        <div className="row">
          {
          this.state.drawings.map(drawings => (
            <div key={drawings.drawingId} className="col">
              <img src={drawings.drawing.slice(14)}></img>
            </div>))
          }
        </div>
      </div>
    );
  }
}
