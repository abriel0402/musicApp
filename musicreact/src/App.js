import './App.css';
import Home from './Home';
import Songs from './Songs';
import SongUploadPage from './SongUploadPage';
import RegisterPage from './RegisterPage';
import LoginForm from './LoginForm';
import { useState, useEffect } from 'react';
import PlaylistsPage from './PlaylistsPage';

function App() {


  const [loggedIn, setLoggedIn] = useState(false)

  function handleLoggedIn(status) {
    setLoggedIn(status)
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      setLoggedIn(true)
    }
  }, [])

  
  let Component



 
  switch (window.location.pathname) {
    case "/index/":
      Component = <Home />
      break
      case "/song-upload/":
        Component = <SongUploadPage />
        break
      case "/songs/":
      Component = <Songs />
      break
      case "/playlists/":
        Component = <PlaylistsPage />
        break
      
  }


  if (loggedIn){
    return Component
  } else {
    return(
      <>
      <RegisterPage />
      <LoginForm onLogin={handleLoggedIn} />
      </>
    )
  }
}

export default App;
