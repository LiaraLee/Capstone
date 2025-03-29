import React, { useState } from 'react';
import InputField from './InputField';

const LoginForm = ({ setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        setMessage('Login Successful!');
      } else {
        setMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setMessage('Error connecting to server');
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
