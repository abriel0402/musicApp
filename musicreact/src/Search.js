import { useRef, useState } from "react";
import axios from "axios";


function Search() {
  const [songs, setSongs] = useState([])


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
    background: "#a742f5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px", 
    textDecoration: "none",
  };



  const searchContainerStyles = {
    width: "800px",
    justifyContent: "center",
    alignItems: "center",
  };



  return (
    <div style={containerStyles}>
      <div style={searchContainerStyles}>
        <div style={formContainerStyles}>
          <input ref={input} type="text" placeholder="Search" style={inputStyles} />
          <button onClick={handleSearch} style={buttonStyles}>
            Search
          </button>
      </div>
    </div>
    </div>
  );
}

export default Search;