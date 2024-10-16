import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService"; // Import your authService for login/logout functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to log in the user
  const login = async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  // Rehydrate the user on app load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Indicate that rehydration has finished
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
