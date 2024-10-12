import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import process from 'process';

window.process = {
  env: {
    NODE_ENV: 'development' // or 'production' based on your environment
  }
};
window.process = process;



if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  // Code that runs only in Node.js
  console.log('Running in Node.js');
} else {
  // Code that runs in the browser
  console.log('Running in the browser');
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
