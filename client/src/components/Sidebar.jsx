// Sidebar.js
import React from 'react';
import { FaPlus, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-button">
          <FaPlus /> New Chat
        </button>
      </div>
      <ul className="chat-list">
        <li className="chat-item">Chat 1</li>
        <li className="chat-item">Chat 2</li>
        <li className="chat-item">Chat 3</li>
      </ul>
      <div className="sidebar-footer">
        <button className="settings-button">
          <FaCog /> Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
