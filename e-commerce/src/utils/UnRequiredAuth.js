import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const UnRequiredAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth?.user?.accessToken) {
    return children;
  }
  return <Navigate to={'/'} />;    
};

export default UnRequiredAuth;