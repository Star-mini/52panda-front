import React from "react";
import "../../static/styles/css/login.css";
import SocialLogin from "../commons/SocialLogin";

function Login() {
  return (
    <div className="App">
      <div className="box">
        <SocialLogin />
      </div>
    </div>
  );
}

export default Login;
