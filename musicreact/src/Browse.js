import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from 'react-auth-kit';

function Browse() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([])

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
      .get("/browse/")
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlePlay(songID) {
    console.log(songID);
    axios
      .post("/api/update-plays/", { songID: songID })
      .catch((error) => {
        console.log(error);
      });
    console.log(songID);
  }

  function handleLike(songID) {
    if (likedSongs.includes(songID)) {
      setLikedSongs(likedSongs.filter((id) => id !== songID));
      axios
        .post('/api/update-likes/', { songID: songID, toDo: 'decrement', userID: id })
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

  console.log(likedSongs)

  const songContainerStyles = {
    margin: "20px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const songTitleStyles = {
    fontSize: "1.2rem",
    marginBottom: "5px",
  };

  const audioStyles = {
    marginBottom: "10px",
  };

  const browseContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const likeButtonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginTop: '5px',
  };

  const headerStyles = {
    textAlign: "center",
  };

  return (
    <div style={browseContainerStyles}>
      <h1 style={headerStyles}>Browse</h1>
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
          <button onClick={() => handleLike(song.id)} style={likeButtonStyles}>
                {likedSongs.includes(song.id) ? 'Unlike' : 'Like'}
              </button>
        </div>
      ))}
    </div>
  );
}

export default Browse;
