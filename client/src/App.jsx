// App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;
