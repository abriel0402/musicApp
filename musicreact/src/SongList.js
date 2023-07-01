import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [playlists, setPlaylists] = useState([])
  const [selectedSongID, setSelectedSongID] = useState(null)
  
  const authUser = useAuthUser();
  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    axios.post("/api/get-liked-songs", { id: id })
      .then((response) => {
        setLikedSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.post('/api/songs/', { uploaderID: id })
      .then((response) => {
        setSongs(response.data.songs);
        console.log(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  function handlePlay(songID) {
    console.log(songID);
    axios.post('/api/update-plays/', { songID: songID })
      .catch((error) => {
        console.log(error);
      });
    console.log(songID);
  }

  function deleteSong(song) {
    console.log(song.id);
    axios.post('/api/delete/', { songID: song.id, uploaderID: id })
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLike(songID) {
    if (likedSongs.includes(songID)) {
      setLikedSongs(likedSongs.filter((id) => id !== songID));
      axios.post('/api/update-likes/', { songID: songID, toDo: 'decrement', userID: id })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLikedSongs(likedSongs.concat(songID));
      axios.post('/api/update-likes/', { songID: songID, toDo: 'increment', userID: id })
        .catch((error) => {
          console.log(error);
        });
    }
  }

 
  useEffect(() => { // gets playlists when user click on add to playlist
    axios
      .post('/api/playlists/', { userID: id })
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showMenu]);
  


  function handleAddButtonClick(songID) {
    setSelectedSongID(songID);
    setShowMenu(true);
  };

  function handleCloseMenu() {
    setShowMenu(false);
  };

  function handleAddSongToPlaylist(playlistID) {
    setShowMenu(false);
    axios.post("/api/add-song-to-playlist/", { songID: selectedSongID, playlistID: playlistID })
      .then((response) => {
        console.log("added to playlist");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const menuStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
    textAlign: "center",
    zIndex: '9999',
  };

  const songContainerStyles = {
    margin: '1px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    textAlign: "center",
    alignItems: 'center', 
    width: '300px',
    transform: 'scale(0.7)', 
  };

  const songTitleStyles = {
    fontSize: '1.4rem',
    marginBottom: '10px',
  };

  
  const audioStyles = {
    marginBottom: '20px',
  };

  const deleteButtonStyles = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    border: 'none',
    outline: 'none',
  };

  const likeButtonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    border: 'none',
    outline: 'none',
  };

  const addButtonStyles = {
    backgroundColor: '#02a61d',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    border: 'none',
    outline: 'none',
  };

  const containerStyles = {
    display: 'flex',
    overflowX: 'auto', 
  };

  const headerStyles = {
    fontSize: '2rem',
    marginBottom: "20px",
    textAlign: "center",
  }

  const closeButtonStyles = {
    color: "white",
    backgroundColor: "#a742f5",
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    border: 'none',
    outline: 'none',
  }
  
  
  return (
    <div>
      <h1 style={headerStyles}>Your Songs</h1>
      <div style={containerStyles}>
        {songs.map((song) => (
          <div key={song.id} style={songContainerStyles}>
            <img style={{ borderRadius: '10px' }} width="250" height="250" src={`/media/${song.image}`} alt="Cover" />
            <h3 style={songTitleStyles}>
              {song.name} - {song.artist}
            </h3>
            
            <audio
              controls
              src={`/media/${song.file}`}
              style={audioStyles}
              data-song-id={song.id}
              onPlay={() => handlePlay(song.id)}
            ></audio>
            <div>
            <div style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{song.plays}</span>
                Plays
                <span style={{ marginLeft: "15px", fontWeight: 'bold', marginRight: '5px' }}>{song.likes}</span>
                Likes
              </div>
              <div>
                <button onClick={() => handleAddButtonClick(song.id)} style={addButtonStyles}>+</button>
                
                <button onClick={() => handleLike(song.id)} style={likeButtonStyles}>
                  {likedSongs.includes(song.id) ? 'Unlike' : 'Like'}
                </button>
                <button onClick={() => deleteSong(song)} style={deleteButtonStyles}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {showMenu && (
          <div style={menuStyles}>
            
          <h2>Add to Playlist</h2>
            {playlists.length > 0 && playlists.map((playlist) => (
              <h3 key={playlist.id} onClick={() => handleAddSongToPlaylist(playlist.id)}style={{cursor: "pointer", fontWeight: "normal"}}>
              {playlist.name}
              </h3>
            ))}
              <button style={closeButtonStyles} onClick={handleCloseMenu}>Close</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default SongList;
