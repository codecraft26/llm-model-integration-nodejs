// Sidebar.js
import React, { useEffect } from 'react';
import { FaPlus, FaCog } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedChatHistory } from '../actions/chatActions'; // Import the action
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  
  // Select the saved chat history from the Redux store
  const savedChats = useSelector((state) => state.chat.savedChats);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);
  
  // Fetch saved chats when the component mounts
  useEffect(() => {
    dispatch(getSavedChatHistory());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-button">
          <FaPlus /> New Chat
        </button>
      </div>
      <div className="chat-list-container">
        <ul className="chat-list">
          {loading && <li>Loading chats...</li>}
          {error && <li>Error loading chats: {error}</li>}
          {savedChats && savedChats.length > 0 ? (
            savedChats.map((chat, index) => (
              <li key={index} className="chat-item">
                {chat.title || `Chat ${index + 1}`} {/* Display chat title if available */}
              </li>
            ))
          ) : (
            <li>No saved chats available</li>
          )}
        </ul>
      </div>
      <div className="sidebar-footer">
        <button className="settings-button">
          <FaCog /> Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
