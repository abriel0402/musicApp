import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function Search() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const input = useRef(null);

  const authUser = useAuthUser();
  const id = authUser() ? authUser().id : null;

  useEffect(() => {
    axios
      .post("/api/get-liked-songs", { id: id })
      .then((response) => {
        setLikedSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleLike(songID) {
    if (likedSongs.includes(songID)) {
      setLikedSongs(likedSongs.filter((id) => id !== songID));
      axios
        .post("/api/update-likes/", { songID: songID, toDo: "decrement", userID: id })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLikedSongs(likedSongs.concat(songID));
      axios
        .post("/api/update-likes/", { songID: songID, toDo: "increment", userID: id })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleSearch() {
    const text = input.current.value;
    axios
      .post("/api/search/", { text })
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePlay(songID) {
    axios
      .post("/api/update-plays/", { songID })
      .catch((error) => {
        console.log(error);
      });
  }

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  };
  

  const formContainerStyles = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  };
  
  const inputStyles = {
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "200px", 
  };

  const buttonStyles = {
    padding: "8px 16px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px", 
  };


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
    marginBottom: "20px",
  };

  const searchContainerStyles = {
    width: "400px",
    alignItems: "center",
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
    backgroundColor: "#02a61d",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    border: "none",
    outline: "none",
  };

  return (
    <div style={containerStyles}>
      <div style={searchContainerStyles}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' , textAlign: "center"}}>Search</h1>
        <div style={formContainerStyles}>
          <input ref={input} type="text" placeholder="Search" style={inputStyles} />
          <button onClick={handleSearch} style={buttonStyles}>
            Search
          </button>
        </div>
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
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 'bold', marginRight: '5px', textAlign: "center" }}>{song.plays}</span>
                Plays
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold", marginRight: "5px", textAlign: "center"}}>{song.likes}</span>
                Likes
              </div>
              <div>
                <button style={addButtonStyles}>+</button>
                <button onClick={() => handleLike(song.id)} style={likeButtonStyles}>
                  {likedSongs.includes(song.id) ? "Unlike" : "Like"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;