import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';


function SongList() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  
  const authUser = useAuthUser();
  const id = authUser() ? authUser().id : null;

  useEffect(() => { // gets the already-liked songs when the page loads

    axios.post("/api/get-liked-songs", {id: id})
    .then((response) => {
      setLikedSongs(response.data.songs)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])


  useEffect(() => {
    axios
      .post('/api/songs/', {"uploaderID": id})
      .then((response) => {
        setSongs(response.data.songs);
        console.log(response.data.songs)
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
      .post('/api/delete/', { songID: song.id, uploaderID: id })
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
        .post('/api/update-likes/', { songID: songID, toDo: 'decrement' , userID: id})
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLikedSongs(likedSongs.concat(songID));
      axios
        .post('/api/update-likes/', { songID: songID, toDo: 'increment', userID: id })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  
  const songContainerStyles = {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Your Songs</h1>
        {songs.map((song) => (
          <div key={song.id} style={songContainerStyles}>
            <img width="250" height="250" src={`/media/${song.image}`} alt="Cover"/>
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
              </div>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{song.likes}</span>
                Likes
              </div>
              <div>
                <button style={addButtonStyles}>+</button>
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
      </div>
    </div>
  );
}

export default SongList;