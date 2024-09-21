import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL || "https://cms-backend-production-da64.up.railway.app/api"}/users`,{
            headers: {
                'Authorization': token
              }
        });
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      await axios.put(`${process.env.REACT_APP_API_URL || "https://cms-backend-production-da64.up.railway.app/api"}/manage/${userId}`, {
        role: newRole
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update user list after role change
      const res = await axios.get(`${process.env.REACT_APP_API_URL || "https://cms-backend-production-da64.up.railway.app/api"}/users`);
      setUsers(res.data);
      setNewRole('');
      setSelectedUserId(null);
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  return (
    <div className="user-list">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.role})
            <button onClick={() => setSelectedUserId(user._id)}>
              Change Role
            </button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div className="role-change-form">
          <h3>Change Role</h3>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="writer">Writer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => handleRoleChange(selectedUserId)}>
            Update Role
          </button>
          <button onClick={() => setSelectedUserId(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
