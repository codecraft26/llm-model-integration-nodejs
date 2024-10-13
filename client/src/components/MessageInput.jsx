// MessageInput.js
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './MessageInput.css';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {

    console.log("message",message)
    if (message.trim()) {
      onSend(message); // Call the onSend function passed as a prop
      setMessage('');
    }
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
