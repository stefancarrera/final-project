import React from 'react';
// import Home from './pages/home';
import Canvas from './pages/canvas';
import Header from './components/header';
import UserGallery from './pages/userGallery';
import BtmNav from './components/btmNav';
import parseRoute from './lib/parse-route';
import ImgPg from './pages/imgPg';
import GlobalGallery from './pages/globalGallery';
import GlbImgPg from './pages/glbImgPg';

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
        <UserGallery />
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
    if (route.path === 'globalGallery') {
      return (
      <div className="top-div">
      <Header />
      <GlobalGallery />
      <BtmNav />
      </div>
      );
    }
    if (route.path === 'glbdrawings') {
      const drawingId = route.params.get('drawingId');
      return (
        <div className="top-div">
        <Header />
        <GlbImgPg drawingId={drawingId}/>
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
