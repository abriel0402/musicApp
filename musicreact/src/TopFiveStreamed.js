import axios from "axios";
import { useEffect, useState } from "react";

function TopFiveStreamed() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/five-most-streamed/")
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "5px",
    margin: "0 auto",
    textAlign: "center",
    maxWidth: "400px",
  };
  

  const headerStyles = {
    fontSize: "1.8rem",
    marginBottom: "20px",
  };

  const songStyles = {
    fontSize: "1.2rem",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyles}>
      <h2 style={headerStyles}>Top 5 Most Streamed Songs</h2>
      {songs.map((song) => (
        <div key={song.id} style={songStyles}>
          {song.plays} plays: {song.name} - {song.artist}
        </div>
      ))}
    </div>
  );
}

export default TopFiveStreamed;
