import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default to null

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
            headers: {
              'Authorization': token
            }
          });
          setUser(res.data); // Store complete user data
        } catch (error) {
          console.error('Failed to fetch user details', error);
          localStorage.removeItem('token'); // Clear token if fetching fails
        }
      };

      fetchUserDetails();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || "https://cms-backend-production-da64.up.railway.app/api"}/users/login`, { email, password });
      const { token } = res.data;
      
      // Fetch user details after login
      const userRes = await axios.get(`${process.env.REACT_APP_API_URL || "https://cms-backend-production-da64.up.railway.app/api"}/users/me`, {
        headers: {
          'Authorization': token
        }
      });

      setUser(userRes.data); // Store complete user data
      localStorage.setItem('token', token); // Store token in localStorage
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
