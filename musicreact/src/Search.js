import { useState, useRef } from "react";
import axios from "axios";

function Search() {
  const [songs, setSongs] = useState([]);
  const input = useRef(null);

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
    console.log(songID);
    axios
      .post("/api/update-plays/", { songID })
      .catch((error) => {
        console.log(error);
      });
    console.log(songID);
  }

  const containerStyles = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
  };

  const formContainerStyles = {
    display: "flex",
    alignItems: "baseline",
  };

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

  const buttonStyles = {
    padding: "8px 16px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const inputStyles = {
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    fontSize: "16px",
  };

  return (
    <div style={containerStyles}>
      <h1>Search</h1>
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
        </div>
      ))}
    </div>
  );
}

export default Search;
