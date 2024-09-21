// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://cms-backend-production-da64.up.railway.app/api/users/register`, { name, email, password });
      toast.success('Registration successful! Please log in.'); // Show success notification
    } catch (error) {
      toast.error('Registration failed.'); // Show error notification
      console.error('Error during registration', error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
