import React from 'react';
import Canvas from './pages/canvas';
import Header from './components/header';
import ImgPg from './pages/imgPg';
import parseRoute from './lib/parse-route';
import BtmNav from './components/btmNavHooks';
import Gallery from './pages/galleryHook';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
      <div className="top-div-canvas">
        <Header />
        <Canvas />
      </div>
      );
    }
    if (route.path === 'userGallery') {
      return (
       <div className="top-div">
        <Header />
        <Gallery />
        <BtmNav />
      </div>
      );
    }
    if (route.path === 'drawings') {
      const drawingId = route.params.get('drawingId');
      return (
      <div className="top-div">
      <Header />
      <ImgPg drawingId={drawingId} />
      <BtmNav />
      </div>
      );
    }
  }

  render() {
    return (
    <>
      { this.renderPage() }
    </>
    );
  }
}
