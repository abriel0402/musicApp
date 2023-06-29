import React from "react";
import RegisterForm from "./RegisterForm";


function RegisterPage() {

    
const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  
  return (
    <div style={containerStyles}>
      <h1>Register</h1>
      <RegisterForm />
      <h1>Login</h1>
    </div>
  );
}

export default RegisterPage;
