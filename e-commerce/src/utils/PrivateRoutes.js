import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const PrivateRoutes = () => {
  const auth = useAuth() 
  if(JSON.parse(auth).accessToken) {
    return auth.accessToken ? <Outlet /> : <Navigate to={"/login"} />;
  }
};

export default PrivateRoutes;
