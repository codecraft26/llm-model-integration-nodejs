// ChatArea.js
import React from 'react';
import MessageInput from './MessageInput';
import './ChatArea.css';

const ChatArea = () => {
  return (
    <div className="chat-area">
      <div className="messages">
        <div className="message bot">Hello! How can I help you?</div>
        <div className="message user">Hi! Tell me about React.</div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatArea;
