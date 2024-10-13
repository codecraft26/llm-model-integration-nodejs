import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MessageInput from './MessageInput';
import { sendPrompt } from '../actions/chatActions'; // Adjust the import path if necessary
import './ChatArea.css';

const ChatArea = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' },
    { text: 'Hi! Tell me about React.', sender: 'user' },
  ]);

  const handleSend = async (message) => {
    // Add user's message to the chat
    const userMessage = { text: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Dispatch sendPrompt action and wait for the response
    try {
      const response = await dispatch(sendPrompt(message)); // Assuming sendPrompt returns the response
      const botMessage = {
        text: response.payload, // Adjust based on how you structure your response
        sender: 'bot',
      };
      // Add bot's response to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending prompt:', error);
      // Optionally add an error message to the chat
      const errorMessage = {
        text: 'Sorry, I could not process your request.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chat-area">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatArea;
