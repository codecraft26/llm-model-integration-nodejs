// Signin.jsx
import React from 'react';
import './Signin.css';

function Signin() {
  return (
    <div className="signin-container">
      <form className="signin-form">
        <h2>Sign In</h2>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <span>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Signin;
