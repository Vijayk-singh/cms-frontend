// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
