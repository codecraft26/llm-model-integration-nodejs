// MessageInput.js
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './MessageInput.css';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle message sending logic
    console.log("Message Sent:", message);
    setMessage('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
