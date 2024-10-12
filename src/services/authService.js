// src/services/authService.js

import mockUsers from '../data/mockUsers'; // Import mock user data

// Simulate an API call for logging in
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = mockUsers.find(user => user.username === username);
    if (user) {
      // Check if the password matches
      if (user.password === password) {
        resolve({ ...user, isAuthenticated: true });
      } else {
        reject(new Error('Invalid password'));
      }
    } else {
      reject(new Error('User not found'));
    }
  });
};

// Simulate an API call for user registration
const register = (newUser) => {
  return new Promise((resolve) => {
    // Here you would typically send a request to your API to create a user
    mockUsers.push(newUser); // Add the new user to the mock data
    resolve(newUser);
  });
};

// Simulate checking if the user is authenticated
const isAuthenticated = (username) => {
  return mockUsers.some(user => user.username === username);
};

export default {
  login,
  register,
  isAuthenticated,
};
