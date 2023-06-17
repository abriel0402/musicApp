import React, { useState } from "react";
import axios from "axios";

function CreatePlaylistForm() {
  const [formData, setFormData] = useState({
    name: "",
  });

  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);

    axios
      .post("/playlists/", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const formStyles = {
    margin: "20px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    textAlign: "center",
  };

  const inputStyles = {
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    fontSize: "16px",
  };

  const buttonStyles = {
    padding: "8px 16px",
    background: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission} style={formStyles}>
        <h3>Create Playlist</h3>
        <input
          onChange={handleInputChange}
          type="text"
          name="name"
          placeholder="Playlist Name"
          style={inputStyles}
        />

        <button type="submit" style={buttonStyles}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;
