import mockUsers from '../data/mockUsers'; // Import initial mock user data

// Load users from localStorage, or use initial mock data if not available
let users = JSON.parse(localStorage.getItem('users')) || mockUsers;

// Simulate an API call for logging in
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.username === username);
    if (user) {
      if (user.password === password) {
         // Store the user in localStorage to persist the session
         localStorage.setItem('loggedInUser', JSON.stringify({ ...user, isAuthenticated: true }));
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
    users.push(newUser); // Add the new user to the mock data
    localStorage.setItem('users', JSON.stringify(users)); // Persist to localStorage
    resolve(newUser);
  });
};

// Simulate checking if the user is authenticated
const isAuthenticated = (username) => {
  return users.some(user => user.username === username);
};

export default {
  login,
  register,
  isAuthenticated,
};
