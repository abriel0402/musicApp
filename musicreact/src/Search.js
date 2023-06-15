import { useState } from "react";
import axios from "axios";

function Search() {
  const [songs, setSongs] = useState([]);

  function handleSearch(e) {
    const text = e.target.value;
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

  return (
    <div style={containerStyles}>
      <h1>Search</h1>
      <input onChange={handleSearch} type="text" placeholder="Search" />
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
