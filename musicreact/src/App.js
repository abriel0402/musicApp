import './App.css';
import Home from './Home';
import Songs from './Songs';
import SongUploadPage from './SongUploadPage';
import RegisterPage from './RegisterPage';
import LoginForm from './LoginForm';
import { useState, useEffect } from 'react';
import PlaylistsPage from './PlaylistsPage';
import { useAuthHeader } from 'react-auth-kit';
import Profile from './Profile';

function App() {


  const [loggedIn, setLoggedIn] = useState(false)
  const authHeader = useAuthHeader();

  function handleLoggedIn(status) {
    setLoggedIn(status)
  }

  useEffect(() => {
    const token = authHeader(); // Call the authHeader function to get the token
    if (token) {
      setLoggedIn(true);
    }
  }, [authHeader])

  
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
      case "/profile/":
        Component = <Profile />
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
