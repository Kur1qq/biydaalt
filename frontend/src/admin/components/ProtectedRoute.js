import React from "react";
import { Navigate } from "react-router-dom";
import {Auth} from "../hooks/Auth"
const ProtectedRoute = ({ children }) => {
  const isAuth = Auth();

  if (!isAuth) {
    return <Navigate to="/adminLogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
