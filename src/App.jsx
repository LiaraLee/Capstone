import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MessageDisplay from './MessageDisplay';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="app-container">
      <h2>Welcome</h2>
      <h3>Login</h3>
      <LoginForm setMessage={setMessage} />
      <MessageDisplay message={message} />
    </div>
  );
}

export default App;
