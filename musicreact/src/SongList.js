import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SongList() {
  const [songs, setSongs] = useState([]);

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

  useEffect(() => {
    function handlePlay(songID) {
      axios
        .post('/api/update-plays/', { songID })
        .catch((error) => {
          console.log(error);
        });
    }

    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach((audio) => {
      audio.addEventListener('play', () => {
        const songID = parseInt(audio.dataset.songId);
        handlePlay(songID);
      });
    });

    return () => {
      audioElements.forEach((audio) => {
        audio.removeEventListener('play', () => {
          const songID = parseInt(audio.dataset.songId);
          handlePlay(songID);
        });
      });
    };
  }, []);

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

  const songContainerStyles = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
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
            <audio controls src={`/media/${song.file}`} style={audioStyles} data-song-id={song.id}></audio>
            <button onClick={() => deleteSong(song)} style={deleteButtonStyles}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
