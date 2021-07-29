import React from 'react';

export default class GlobalGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDrawings: []
    };
  }

  componentDidMount() {
    fetch('/api/drawings')
      .then(response => response.json())
      .then(data => this.setState({ allDrawings: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
    <>
      <div className="col headerTwo">
        <h1 className="headerTwoH1">Welcome to the Global Gallery</h1>
        <h3>Here you can see drawings from all users!</h3>
      </div>
      <div className="row">
        {
          this.state.allDrawings.map(drawings => (
            <div key={drawings.drawingId} className="col">
              <a href={`#glbdrawings?drawingId=${drawings.drawingId}`}>
                <img src={drawings.drawing.slice(14)}></img>
              </a>
             </div>
          ))
        }
      </div>
    </>
    );
  }
}
