import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";


function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const signIn = useSignIn()


  function handleFormSubmission(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);

    axios
      .post("/login/", data)
      .then((response) => {
        if (response.data.token != null){
          onLogin(response.data.status);
          signIn({
            token: response.data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: response.data.username, id: response.data.id}
          })
        }
        console.log(response.data.token)

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
        Login
      </button>
    </form>
  );
}

export default LoginForm;
