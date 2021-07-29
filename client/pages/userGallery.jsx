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
      <>
        <div className="col headerTwo">
          <h1 className="headerTwoH1">Welcome to Your Personal Gallery</h1>
          <h3>Here you can see all your drawings!</h3>
        </div>
      <div>
        <div className="row">
          {
          this.state.drawings.map(drawings => (
            <div key={drawings.drawingId} className="col">
              <a href={`#drawings?drawingId=${drawings.drawingId}`}>
              <img src={drawings.drawing.slice(14)}></img>
              </a>
            </div>))
          }
        </div>
      </div>
      </>
    );
  }
}
