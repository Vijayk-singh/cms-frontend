import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>
      <div className="sidebar-content">
       <div className="sidebar_header">

       </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/articles" className="sidebar-item">Articles</Link>
          </li>
          <li>
          {<Link to="/add-article" className="sidebar-item">Add Article</Link>}  
          </li>
          <li>
            <Link to="/users" className="sidebar-item">Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
