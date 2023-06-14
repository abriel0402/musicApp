import { useEffect, useState } from "react";
import axios from "axios";

function Browse() {
  const [songs, setSongs] = useState([]);

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
        </div>
      ))}
    </div>
  );
}

export default Browse;
