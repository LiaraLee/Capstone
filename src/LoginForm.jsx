// LoginForm.jsx
import React, { useState } from 'react';
import InputField from './InputField';

const LoginForm = ({ setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and send login data (this is just an example)
    if (email === 'user@example.com' && password === 'password123') {
      setMessage('Login Successful!');
    } else {
      setMessage('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField 
        label="Email" 
        type="email" 
        value={email} 
        onChange={handleEmailChange} 
      />
      <InputField 
        label="Password" 
        type={passwordVisible ? "text" : "password"} 
        value={password} 
        onChange={handlePasswordChange} 
      />
      <button type="button" onClick={togglePasswordVisibility}>
        {passwordVisible ? 'Hide Password' : 'Show Password'}
      </button>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
