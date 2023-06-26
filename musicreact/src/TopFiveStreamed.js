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
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
    margin: "20px",
    maxWidth: "400px",
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    margin: "20px auto",
    textAlign: "center",
  };
  
  const headerStyles = {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "black",
  };
  
  const songStyles = {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#666666",
  };

  return (
    <div style={containerStyles}>
      <h2 style={headerStyles}>Top 5 Most Streamed Songs</h2>
      {songs.map((song, index) => (
        <div key={song.id} style={songStyles}>
          {index + 1}. {song.name} - {song.artist} ({song.plays} plays)
        </div>
      ))}
    </div>
  );
}

export default TopFiveStreamed;
