import './App.css';
import Home from './Home';
import SongUpload from './SongUpload';
import SongList from './SongList';
import Songs from './Songs';

function App() {

  let Component

  switch (window.location.pathname) {
    case "/index/":
      Component = <Home />
      break
      case "/songs/":
      Component = <Songs />
      break
  }

  return Component
}

export default App;
