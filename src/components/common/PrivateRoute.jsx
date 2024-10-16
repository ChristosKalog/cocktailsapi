import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Show a loading screen while checking auth status
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
