
import Home from './components/Home'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying a token in local storage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <Router>
    <div >
      <Routes>
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/signup" /> : <Signup />} 
        />
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/signin" /> : <Signin onLogin={handleLogin} />} 
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div className="home">
               <Home/>
              </div>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </div>
  </Router>
  )
}

export default App