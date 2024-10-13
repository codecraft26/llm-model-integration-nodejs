// App.js
import React from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import './Home.css';

function Home() {
  return (
    <div className="app">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default Home;