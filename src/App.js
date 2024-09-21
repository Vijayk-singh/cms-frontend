import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import AddArticle from './components/AddArticle';
import Users from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext';
import './App.css'; // Your global CSS

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed sidebar
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between login and register
  const { user } = useContext(AuthContext); // Get user from AuthContext

  useEffect(() => {
    // Set sidebar to closed when the component mounts
    setIsSidebarOpen(false);
  }, []);

  // Function to toggle between Login and Register
  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        
        {/* If user is not logged in, show the login/register toggle */}
        {!user ? (
          <div className="auth-container">
             <button onClick={toggleAuthMode} className="toggle-auth-btn">
              {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
            </button>
            {isLoginMode ? <Login /> : <Register />}
          </div>
        ) : (
          <div className="content-layout">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`main-content ${isSidebarOpen ? 'shrink' : ''}`}>
              <Routes>
                <Route path="/articles" element={<ArticleList />} />
                {(user.role === "admin" || user.role === "editor" || user.role === "writer") && (
                  <Route path="/add-article" element={<AddArticle />} />
                )}
                {user.role === "admin" && <Route path="/users" element={<Users />} />}
                <Route path="*" element={<Navigate to="/articles" />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
