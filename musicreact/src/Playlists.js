import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist';
import { useAuthUser } from 'react-auth-kit';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylistID, setActivePlaylistID] = useState(null);

  const authUser = useAuthUser();
  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    axios
      .post('/api/playlists/', { userID: id })
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlePlaylistClick(playlistID) {
    console.log('Active playlist id:', playlistID);
    setActivePlaylistID(activePlaylistID === playlistID ? null : playlistID);
  }

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const playlistContainerStyles = {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    display: 'flex',
    fontSize: '3rem',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const playlistLinkStyles = {
    textDecoration: 'none',
    color: 'black',
  };

  const playlistTitleStyles = {
    fontSize: '1.2rem',
    marginBottom: '5px',
  };

  const headerStyles = {
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <div>
        <h1 style={headerStyles}>Playlists</h1>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={playlistContainerStyles}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <a href="#" style={playlistLinkStyles}>
              <h3 style={playlistTitleStyles}>{playlist.name}</h3>
            </a>
          </div>
        ))}
      </div>
      {activePlaylistID && <Playlist playlistID={activePlaylistID} />}
    </div>
  );
}

export default Playlists;
