import React, { useState } from 'react';
import axios from 'axios';

function SongUpload() {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    file: null,
  });

  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('artist', formData.artist);
    data.append('file', formData.file);

    axios
      .post('/songs/', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInputChange(e) {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  }

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center', 
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '20px',
  };

  const inputStyles = {
    marginBottom: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyles}>
      <h1>Upload Song</h1> 
      <div> 
        <form
          onSubmit={handleFormSubmission}
          method="POST"
          encType="multipart/form-data"
          style={formStyles}
        >
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Song Name"
            onChange={handleInputChange}
            style={inputStyles}
          />
          <input
            type="text"
            value={formData.artist}
            name="artist"
            placeholder="Artist"
            onChange={handleInputChange}
            style={inputStyles}
          />
          <input type="file" name="file" onChange={handleInputChange} style={inputStyles} />
          <button type="submit" style={buttonStyles}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default SongUpload;
