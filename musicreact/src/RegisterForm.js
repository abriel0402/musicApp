import React, { useState } from "react";
import axios from "axios";



function RegisterForm() {
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    password: "",
  });

  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("displayName", formData.displayName);
    data.append("username", formData.username);
    data.append("password", formData.password);

    axios
      .post("/register/", data)
      .then((response) => {
        //console.log(response.data)
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
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "0 auto",
  };
  
  const inputStyles = {
    padding: "5px",
    fontSize: "1rem",
  };
  
  const buttonStyles = {
    padding: "10px",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };


  
  return (
    <form style={formStyles} onSubmit={handleFormSubmission}>
      <input
        style={inputStyles}
        type="text"
        name="displayName"
        value={formData.displayName}
        placeholder="Display Name"
        onChange={handleInputChange}
      />
      <input
        style={inputStyles}
        type="text"
        name="username"
        value={formData.username}
        placeholder="Username"
        onChange={handleInputChange}
      />
      <input
        style={inputStyles}
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button style={buttonStyles} type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
