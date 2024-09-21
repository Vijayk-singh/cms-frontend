import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Header.css'; // Assuming CSS file for styling

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('General');

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Open settings modal
  const openSettings = () => {
    setSettingsOpen(true);
    setDropdownOpen(false); // Close dropdown when opening settings
  };

  // Close settings modal
  const closeSettings = () => {
    setSettingsOpen(false);
  };

  // Handle menu click
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // Display the content of the selected menu
  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'General':
        return <div><h3>General Settings</h3><p>General settings details go here...</p></div>;
      case 'Security':
        return <div><h3>Security Settings</h3><p>Security settings details go here...</p></div>;
      case 'Profile':
        return <div><h3>Profile Details</h3><p>Name: {user.name}</p><p>Email: {user.email}</p></div>;
      case 'Delete Account':
        return <div><h3>Delete Account</h3><p>Account deletion instructions go here...</p></div>;
      default:
        return <div><h3>Select a Menu Item</h3></div>;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>JANKARI</h1>
       
      </div>
      <div className="header-right">
        {user ? (
          <>
            <div className="user-info">
              <span className="user-name">{user.name} ({user.role})</span>
              <button className="profile-btn" onClick={toggleDropdown}>
                {(user.profilePic).length>3? <img src={user.profilePic} alt="Profile" className="profile-img" /> :"🙂"}
               
              </button>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="menu-item" onClick={() => alert('My Articles')}>My Articles</button>
                <button className="menu-item" onClick={openSettings}>Settings</button>
                <button className="menu-item" onClick={logout}>Logout</button>
                <button className="menu-item">Test</button>
              </div>
            )}
          </>
        ) : (
          <span className="not-logged-in">Not logged in</span>
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="settings-modal">
          <div className="modal-content">
            <div className="settings-left">
              <ul className="settings-menu">
                <li className={activeMenu === 'General' ? 'active' : ''} onClick={() => handleMenuClick('General')}>General</li>
                <li className={activeMenu === 'Security' ? 'active' : ''} onClick={() => handleMenuClick('Security')}>Security</li>
                <li className={activeMenu === 'Profile' ? 'active' : ''} onClick={() => handleMenuClick('Profile')}>Profile</li>
                <li className={activeMenu === 'Delete Account' ? 'active' : ''} onClick={() => handleMenuClick('Delete Account')}>Delete Account</li>
              </ul>
              
            </div>
           
            <div className="settings-right">
              {renderMenuContent()}
              <button className="close-btn" onClick={closeSettings}>Close</button>
            </div>
          
          </div>
         
        </div>
      )}
    </header>
  );
};

export default Header;
