import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify for notifications
import './AddArticle.css'
const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage or context
      const token = localStorage.getItem('token'); // Adjust if using context or other method

      // Send the request with authorization header
      await axios.post(`${process.env.REACT_APP_API_URL||"https://cms-backend-production-da64.up.railway.app/api"}/articles`, {
        title,
        content,
        media
      }, {
        headers: {
          Authorization: token
        }
      });

      toast.success('Article added successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      toast.error('Failed to add article. Please try again.');
      console.error('Error adding article', error);
    }
  };

  return (
    <div className="add-article-container">
      <h2>Add a New Article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="Media"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          required
        />
        
        <textarea
          placeholder="Article Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
