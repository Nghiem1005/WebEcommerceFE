import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = { accessToken: null }   
  if(JSON.parse(localStorage.getItem("user"))) {
    auth.accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  }
  return auth.accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
