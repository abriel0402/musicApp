import React, { useState } from "react";
import axios from "axios";

function CreatePlaylistForm() {
  const [formData, setFormData] = useState({
    name: '',
  });

  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);

    axios
      .post('/playlists/', data)
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

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const formStyles = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const inputStyles = {
    marginBottom: '10px',
  };

  const buttonStyles = {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyles}>
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
