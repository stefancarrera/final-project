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
      return <Canvas />;
    }
    if (route.path === 'userGallery') {
      return (
       <>
        <UserGallery />
        <BtmNav />
      </>
      );
    }
    if (route.path === 'drawings') {
      const drawingId = route.params.get('drawingId');
      return (
      <>
      <ImgPg drawingId={drawingId} />
      <BtmNav />
      </>
      );
    }
    if (route.path === 'globalGallery') {
      return (
      <>
      <GlobalGallery />
      <BtmNav />
      </>
      );
    }
    if (route.path === 'glbdrawings') {
      const drawingId = route.params.get('drawingId');
      return (
        <>
        <GlbImgPg drawingId={drawingId}/>
        <BtmNav />
        </>
      );
    }
  }

  render() {
    return (
    <div className="top-div">
      <Header />
      { this.renderPage() }
    </div>
    );
  }
}
