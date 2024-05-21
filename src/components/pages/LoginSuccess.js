import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LoginSuccess() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    const accessToken = searchParams.get("access");
    const username = searchParams.get("username");

    if(userId){
      localStorage.setItem("id",userId);
    }

    if (accessToken) {
      localStorage.setItem("access", accessToken);
    }

    if (username) {
      localStorage.setItem("username", username);
    }

    localStorage.setItem("login",1);

    console.log("id test",localStorage.getItem("id"));
    console.log("access test",localStorage.getItem("access"));
    
    window.location.href = "/";
    
  }, []);

  return null;
}

export default LoginSuccess;
