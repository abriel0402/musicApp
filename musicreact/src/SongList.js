import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    axios
      .get('/api/songs/')
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlePlay(songID) {
    console.log(songID);
    axios
      .post('/api/update-plays/', { songID: songID })
      .catch((error) => {
        console.log(error);
      });
    console.log(songID);
  }

  function deleteSong(song) {
    console.log(song.id);
    axios
      .post('/api/delete/', { songID: song.id })
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
      axios
        .post('/api/update-likes/', { songID: songID, toDo: 'decrement' })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLikedSongs(likedSongs.concat(songID));
      axios
        .post('/api/update-likes/', { songID: songID, toDo: 'increment' })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const songContainerStyles = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const songTitleStyles = {
    fontSize: '1.2rem',
    marginBottom: '5px',
  };

  const audioStyles = {
    marginBottom: '10px',
  };

  const deleteButtonStyles = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginTop: '5px',
  };

  const likeButtonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginTop: '5px',
  };

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <div>
        <h1>Songs</h1>
        {songs.map((song) => (
          <div key={song.id} style={songContainerStyles}>
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
              <button onClick={() => handleLike(song.id)} style={likeButtonStyles}>
                {likedSongs.includes(song.id) ? 'Unlike' : 'Like'}
              </button>
              <button onClick={() => deleteSong(song)} style={deleteButtonStyles}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
