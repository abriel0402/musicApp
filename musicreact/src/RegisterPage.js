import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useState } from "react";


function RegisterPage() {

    
const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  
  return (
    <div style={containerStyles}>
      <h1>Register below</h1>
      <RegisterForm />
      <h1>Login below</h1>
    </div>
  );
}

export default RegisterPage;
