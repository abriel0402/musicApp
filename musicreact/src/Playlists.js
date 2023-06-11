import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylistID, setActivePlaylistID] = useState(null);



  useEffect(() => {
    axios
      .get('/api/playlists/')
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function handlePlaylistClick(playlistID){
    console.log('Active playlist:', playlistID);
    setActivePlaylistID(playlistID)
  }

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const playlistContainerStyles = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    textAlign: 'center', // Center the text
  };

  const playlistLinkStyles = {
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer',
  };

  const playlistTitleStyles = {
    fontSize: '1.2rem',
    marginBottom: '5px',
  };

  const headerStyles = {
    textAlign: 'center', // Center the header
  };

  return (
    <div style={containerStyles}>
      <div>
        <h1 style={headerStyles}>Playlists</h1>
        {playlists.map((playlist) => (
          <div key={playlist.id} style={playlistContainerStyles}>
            <a onClick={() => handlePlaylistClick(playlist.id)} style={playlistLinkStyles}>
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
