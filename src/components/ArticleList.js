import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./ArticleList.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // Store the user's role
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/articles` ||
            "https://cms-backend-production-da64.up.railway.app/api/articles",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles", error);
        setError("Failed to fetch articles");
      }
    };

    const fetchUserRole = async () => {
      try {
      
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/role` ||
            "https://cms-backend-production-da64.up.railway.app/api/user/role",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserRole(res.data.role); // Assuming the role is in `res.data.role`
      } catch (error) {
        console.error("Error fetching user role", error);
        setError("Failed to fetch user role");
      }
    };

    fetchArticles();
    fetchUserRole();
  }, []);

  const handleEdit = (articleId) => {
    // Navigate to the edit page or show edit modal
    console.log("Edit article with ID:", articleId);
  };
  const handleLike = (articleId) => {
    // Navigate to the edit page or show edit modal
    console.log("Like article with ID:", articleId);
  };
  const handleDislike = (articleId) => {
    // Navigate to the edit page or show edit modal
    console.log("DisLike article with ID:", articleId);
  };
  const handleShare = (articleId) => {
    // Navigate to the edit page or show edit modal
    console.log("Share article with ID:", articleId);
  };


  const handleDelete = async (articleId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/articles/${articleId}` ||
          `https://cms-backend-production-da64.up.railway.app/api/articles/${articleId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Article Deleted Successfully");
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article", error);
      toast.error("Failed to delete article");
    }
  };

  return (
    <div className="article-list-container">
      <h2 className="title">Articles</h2>

      {error && <p className="error">{error}</p>}
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article._id} className="article-item">
            <h3 className="article-title">{article.title}</h3>
            {article.media && (
              <img
                src={article.media}
                alt={article.title}
                className="article-media"
              />
            )}
            <p className="article-content">{article.content}</p>
            <hr className="divider" />
            <div className="articleFooter">
             
              <button
                  onClick={() => handleLike(article._id)}
                  className="like-btn"
                >👍🏻Like</button>
                 <button
                  onClick={() => handleDislike(article._id)}
                  className="dislike-btn"
                >👎🏻DisLike</button>
                <button
                  onClick={() => handleShare(article._id)}
                  className="share-btn"
                >👉🏻Share</button>
                 <span className="author-info">Writer: {article.author.name}</span>
            </div>
            {(userRole === "admin" || article.author._id === user._id) && (
              <div className="article-actions">
                <button
                  onClick={() => handleEdit(article._id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
