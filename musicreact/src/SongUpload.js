import React, { useState } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';



function SongUpload() {

  const authUser = useAuthUser();
  const id = authUser() ? authUser().id : null;

  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    file: null,
    uploaderID: id,
    image: null,
  });
  



  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('artist', formData.artist);
    data.append('file', formData.file);
    data.append("uploaderID", id)
    data.append("image", formData.image)

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
    marginTop: "73.33px", // to give space for navbar
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
    padding: "8px 16px",
    background: "#a742f5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
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
          <label style={{color: "#5e5e5e"}} for="1">Audio File</label>
          <input type="file" name="file" id="1"  className="hidden" onChange={handleInputChange} style={inputStyles} />
          <label style={{color: "#5e5e5e"}}for="2">Image File</label>
          <input type="file" name="image" id="2" classameN="hidden" onChange={handleInputChange} style={inputStyles} />
          <button type="submit" style={buttonStyles}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default SongUpload;
