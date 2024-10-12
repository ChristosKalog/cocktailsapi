// src/components/common/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Access user from Auth context

  return user ? children : <Navigate to="/login" />; // If authenticated, render children; else, redirect to login
};

export default PrivateRoute;
