// components/Signup.js
import React from 'react';
import './Signup.css';

function Signup({ toggleForm }) {
  return (
    <div className="signup-form">
      <h2>Create Account</h2>
      <form>
        <input type="email" placeholder="Your email" required />
        <input type="password" placeholder="Create a password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={toggleForm}>Sign in</span>
      </p>
    </div>
  );
}

export default Signup;
